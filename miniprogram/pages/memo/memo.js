"use strict";
Page({
    data: {
        isListMode: false,
        isNullData: true,
        memoListData: [],
        pageSize: 20,
        count: 0,
        startX: 0,
        startY: 0
    },
    touchStartTime: 0,
    touchEndTime: 0,
    onPullDownRefresh: function () {
        var that = this;
        wx.stopPullDownRefresh({
            success: function () {
                that.data.count = 0;
                that.setData({
                    count: that.data.count
                });
                that.getMemoListData();
            }
        });
    },
    onReachBottom: function () {
        var memoListData = wx.getStorageSync('memoListData');
        if (memoListData != null) {
            if (this.data.count == Math.ceil(memoListData.length / this.data.pageSize)) {
                wx.showToast({
                    title: '没有更多数据了！',
                    icon: 'none',
                    duration: 1500
                });
            }
            else {
                this.data.count++;
                this.getMemoListData();
            }
        }
    },
    onShow: function () {
        try {
            this.data.count = 0;
            this.setData({
                count: this.data.count
            });
            this.getMemoListData();
            wx.setStorageSync('isEdit', false);
        }
        catch (e) { }
    },
    onLoad: function () {
        this.data.count = 0;
        this.setData({
            count: this.data.count
        });
        this.getMemoListData();
    },
    getMemoListData: function () {
        try {
            var memoListData = wx.getStorageSync('memoListData');
            if (memoListData) {
                memoListData.forEach(function (item) {
                    item.isTouchMove = false;
                });
                var memoListDataTemp = [];
                var total = memoListData.length;
                var pageNum = (this.data.count + 1) * this.data.pageSize;
                if (pageNum > total) {
                    pageNum = total;
                    this.data.count = Math.ceil(total / this.data.pageSize);
                }
                for (var i = 0; i < pageNum; i++) {
                    memoListDataTemp.push(memoListData[i]);
                }
                this.setData({
                    count: this.data.count,
                    memoListData: memoListDataTemp,
                    isNullData: false
                });
            }
            else {
                this.setData({
                    memoListData: [],
                    isNullData: true
                });
            }
        }
        catch (e) {
            wx.showToast({
                title: '获取备忘录数据失败，请稍后再试！',
                icon: 'none',
                duration: 1500
            });
        }
    },
    touchStart: function (event) {
        this.touchStartTime = event.timeStamp;
    },
    touchEnd: function (event) {
        this.touchEndTime = event.timeStamp;
    },
    onClickNew: function () {
        try {
            wx.setStorageSync('isEdit', false);
            wx.navigateTo({
              url: '../../pages/memo_new/memo_new',
            });
        }
        catch (e) { }
    },
    onClickEdit: function (event) {
        if (this.touchEndTime - this.touchStartTime < 350) {
            try {
                wx.setStorageSync('isEdit', true);
                var id = event.currentTarget.dataset.item.id;
                wx.setStorageSync('id', id);
                wx.navigateTo({
                  url: '../../pages/memo_new/memo_new',
                });
            }
            catch (e) { }
        }
    },
    onClickLongDelete: function (event) {
        this.onClickdeleteModal(event);
    },
    onClickdeleteModal: function (event) {
        var that = this;
        wx.showModal({
            title: '删除提示',
            content: '是否确定删除该备忘录！',
            success: function (res) {
                if (res.confirm) {
                    that.onClickdelete(event);
                }
                else if (res.cancel) {
                }
            }
        });
    },
    onClickdelete: function (event) {
        try {
            var index = event.currentTarget.dataset.index;
            if (index != null && this.data.memoListData != null) {
                this.data.memoListData.splice(event.currentTarget.dataset.index, 1);
                this.setData({
                    memoListData: this.data.memoListData
                });
                wx.setStorageSync('memoListData', this.data.memoListData);
                if (this.data.memoListData.length == 0) {
                    wx.clearStorageSync();
                    this.data.isNullData = true;
                    this.data.count = 0;
                    this.setData({
                        isNullData: this.data.isNullData,
                        count: this.data.count
                    });
                }
                wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 1000
                });
            }
        }
        catch (e) { }
    },
    onClickToggleMode: function () {
        this.data.isListMode = !this.data.isListMode;
        this.setData({
            isListMode: this.data.isListMode
        });
    },
    touchstart: function (event) {
        this.data.memoListData.forEach(function (item) {
            if (item.isTouchMove)
                item.isTouchMove = false;
        });
        this.setData({
            memoListData: this.data.memoListData,
            startX: event.changedTouches[0].clientX,
            startY: event.changedTouches[0].clientY
        });
    },
    touchmove: function (event) {
        var that = this, index = event.currentTarget.dataset.index, startX = that.data.startX, startY = that.data.startY, touchMoveX = event.changedTouches[0].clientX, touchMoveY = event.changedTouches[0].clientY, angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
        that.data.memoListData.forEach(function (v, i) {
            v.isTouchMove = false;
            if (Math.abs(angle) > 30)
                return;
            if (i == index) {
                if (touchMoveX > startX)
                    v.isTouchMove = false;
                else
                    v.isTouchMove = true;
            }
        });
        that.setData({
            memoListData: that.data.memoListData
        });
    },
    angle: function (start, end) {
        var _X = end.X - start.X, _Y = end.Y - start.Y;
        return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFFLEtBQUs7UUFDakIsVUFBVSxFQUFFLElBQUk7UUFDaEIsWUFBWSxFQUFFLEVBQVc7UUFDekIsUUFBUSxFQUFFLEVBQUU7UUFDWixLQUFLLEVBQUUsQ0FBQztRQUVSLE1BQU0sRUFBRSxDQUFXO1FBQ25CLE1BQU0sRUFBRSxDQUFXO0tBQ3BCO0lBR0QsY0FBYyxFQUFFLENBQUM7SUFFakIsWUFBWSxFQUFFLENBQUM7SUFLZixpQkFBaUI7UUFDZixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsRUFBRSxDQUFDLG1CQUFtQixDQUFDO1lBQ3JCLE9BQU87Z0JBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsT0FBUSxDQUFDO29CQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7aUJBQ3ZCLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDekIsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFLRCxhQUFhO1FBQ1gsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNyRCxJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDMUUsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDWCxLQUFLLEVBQUUsVUFBVTtvQkFDakIsSUFBSSxFQUFFLE1BQU07b0JBQ1osUUFBUSxFQUFFLElBQUk7aUJB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QUFFLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUVqRixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFNLEVBQUUsQ0FBUztZQUMvQyxDQUFDLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtZQUVyQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFBRSxPQUFPO1lBQ2pDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRTtnQkFDZCxJQUFJLFVBQVUsR0FBRyxNQUFNO29CQUNyQixDQUFDLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTs7b0JBRXJCLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO2FBQ3ZCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBUSxDQUFDO1lBQ1osWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTtTQUNyQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBS0QsS0FBSyxZQUFDLEtBQVUsRUFBRSxHQUFRO1FBQ3hCLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBRTlDLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBRUYsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy9pbmRleC5qc1xuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGlzTGlzdE1vZGU6IGZhbHNlLFxuICAgIGlzTnVsbERhdGE6IHRydWUsXG4gICAgbWVtb0xpc3REYXRhOiBbXSBhcyBhbnlbXSxcbiAgICBwYWdlU2l6ZTogMjAsXG4gICAgY291bnQ6IDAsXG4gICAgLy/lvIDlp4vlnZDmoIdcbiAgICBzdGFydFg6IDAgYXMgbnVtYmVyLFxuICAgIHN0YXJ0WTogMCBhcyBudW1iZXJcbiAgfSxcblxuICAvLyDop6bmkbjlvIDlp4vml7bpl7RcbiAgdG91Y2hTdGFydFRpbWU6IDAsXG4gIC8vIOinpuaRuOe7k+adn+aXtumXtFxuICB0b3VjaEVuZFRpbWU6IDAsXG5cbiAgLyoqXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXG4gICAqL1xuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCh7XG4gICAgICBzdWNjZXNzKCkge1xuICAgICAgICB0aGF0LmRhdGEuY291bnQgPSAwO1xuICAgICAgICB0aGF0LnNldERhdGEhKHtcbiAgICAgICAgICBjb3VudDogdGhhdC5kYXRhLmNvdW50XG4gICAgICAgIH0pO1xuICAgICAgICB0aGF0LmdldE1lbW9MaXN0RGF0YSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcbiAgICovXG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgbGV0IG1lbW9MaXN0RGF0YSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1vTGlzdERhdGEnKTtcbiAgICBpZiAobWVtb0xpc3REYXRhICE9IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmRhdGEuY291bnQgPT0gTWF0aC5jZWlsKG1lbW9MaXN0RGF0YS5sZW5ndGggLyB0aGlzLmRhdGEucGFnZVNpemUpKSB7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfmsqHmnInmm7TlpJrmlbDmja7kuobvvIEnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBkdXJhdGlvbjogMTUwMFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kYXRhLmNvdW50Kys7XG4gICAgICAgIHRoaXMuZ2V0TWVtb0xpc3REYXRhKCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3coKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuZGF0YS5jb3VudCA9IDA7XG4gICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgY291bnQ6IHRoaXMuZGF0YS5jb3VudFxuICAgICAgfSk7XG4gICAgICB0aGlzLmdldE1lbW9MaXN0RGF0YSgpO1xuICAgICAgLy8g6K6+572u57yW6L6R54q25oCBXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnaXNFZGl0JywgZmFsc2UpXG4gICAgfSBjYXRjaCAoZSkgeyB9XG4gIH0sXG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuZGF0YS5jb3VudCA9IDA7XG4gICAgdGhpcy5zZXREYXRhISh7XG4gICAgICBjb3VudDogdGhpcy5kYXRhLmNvdW50XG4gICAgfSk7XG4gICAgdGhpcy5nZXRNZW1vTGlzdERhdGEoKTtcbiAgfSxcblxuICAvKipcbiAgICog6I635Y+W5aSH5b+Y5b2V5pWw5o2u5rqQXG4gICAqL1xuICBnZXRNZW1vTGlzdERhdGEoKSB7XG4gICAgLy8g6I635Y+W5pys5Zyw57yT5a2Y5aSH5b+Y5b2V5YiX6KGo5pWw5o2uXG4gICAgdHJ5IHtcbiAgICAgIGxldCBtZW1vTGlzdERhdGEgPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtb0xpc3REYXRhJyk7XG4gICAgICBpZiAobWVtb0xpc3REYXRhKSB7XG4gICAgICAgIG1lbW9MaXN0RGF0YS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAvL+m7mOiupOmakOiXj+WIoOmZpFxuICAgICAgICAgIGl0ZW0uaXNUb3VjaE1vdmUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOWIhumhtVxuICAgICAgICBsZXQgbWVtb0xpc3REYXRhVGVtcDogYW55W10gPSBbXTtcbiAgICAgICAgbGV0IHRvdGFsID0gbWVtb0xpc3REYXRhLmxlbmd0aDtcbiAgICAgICAgbGV0IHBhZ2VOdW0gPSAodGhpcy5kYXRhLmNvdW50ICsgMSkgKiB0aGlzLmRhdGEucGFnZVNpemU7XG4gICAgICAgIGlmIChwYWdlTnVtID4gdG90YWwpIHtcbiAgICAgICAgICBwYWdlTnVtID0gdG90YWw7XG4gICAgICAgICAgdGhpcy5kYXRhLmNvdW50ID0gTWF0aC5jZWlsKHRvdGFsIC8gdGhpcy5kYXRhLnBhZ2VTaXplKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VOdW07IGkrKykge1xuICAgICAgICAgIG1lbW9MaXN0RGF0YVRlbXAucHVzaChtZW1vTGlzdERhdGFbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgICAgIGNvdW50OiB0aGlzLmRhdGEuY291bnQsXG4gICAgICAgICAgbWVtb0xpc3REYXRhOiBtZW1vTGlzdERhdGFUZW1wLFxuICAgICAgICAgIGlzTnVsbERhdGE6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICBtZW1vTGlzdERhdGE6IFtdIGFzIGFueSxcbiAgICAgICAgICBpc051bGxEYXRhOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6ICfojrflj5blpIflv5jlvZXmlbDmja7lpLHotKXvvIzor7fnqI3lkI7lho3or5XvvIEnLFxuICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgIGR1cmF0aW9uOiAxNTAwXG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICog5oyJ6ZKu6Kem5pG45byA5aeL6Kem5Y+R55qE5LqL5Lu2XG4gICAqL1xuICB0b3VjaFN0YXJ0KGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnRvdWNoU3RhcnRUaW1lID0gZXZlbnQudGltZVN0YW1wXG4gIH0sXG5cbiAgLyoqXG4gICAqIOaMiemSruinpuaRuOe7k+adn+inpuWPkeeahOS6i+S7tlxuICAgKi9cbiAgdG91Y2hFbmQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudG91Y2hFbmRUaW1lID0gZXZlbnQudGltZVN0YW1wXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeCueWHu+aWsOW7ulxuICAgKi9cbiAgb25DbGlja05ldygpIHtcbiAgICB0cnkge1xuICAgICAgLy8g6K6+572u57yW6L6R54q25oCBXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnaXNFZGl0JywgZmFsc2UpXG4gICAgICAvLyDliIfmjaLliLDmlrDlu7pcbiAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy9wYWdlcy9uZXcvbmV3J1xuICAgICAgfSlcbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgfSxcblxuICAvKipcbiAgICog54K55Ye757yW6L6RXG4gICAqL1xuICBvbkNsaWNrRWRpdChldmVudDogYW55KSB7XG4gICAgLy8g5o6n5Yi254K55Ye75LqL5Lu25ZyoMzUwbXPlhoXop6blj5HvvIzliqDov5nlsYLliKTmlq3mmK/kuLrkuobpmLLmraLplb/mjInml7bkvJrop6blj5Hngrnlh7vkuovku7ZcbiAgICBpZiAodGhpcy50b3VjaEVuZFRpbWUgLSB0aGlzLnRvdWNoU3RhcnRUaW1lIDwgMzUwKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyDorr7nva7nvJbovpHnirbmgIFcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2lzRWRpdCcsIHRydWUpXG4gICAgICAgIGxldCBpZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtLmlkO1xuICAgICAgICAvLyDorr7nva5JZFxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaWQnLCBpZClcbiAgICAgICAgLy8g5YiH5o2i5Yiw5paw5bu6XG4gICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL25ldy9uZXcnXG4gICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlKSB7IH1cbiAgICB9XG4gIH0sXG5cbiAgb25DbGlja0xvbmdEZWxldGUoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMub25DbGlja2RlbGV0ZU1vZGFsKGV2ZW50KTtcbiAgfSxcblxuICAvKipcbiAgICog5Yig6Zmk5o+Q56S6XG4gICAqL1xuICBvbkNsaWNrZGVsZXRlTW9kYWwoZXZlbnQ6IGFueSkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICfliKDpmaTmj5DnpLonLFxuICAgICAgY29udGVudDogJ+aYr+WQpuehruWumuWIoOmZpOivpeWkh+W/mOW9le+8gScsXG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICB0aGF0Lm9uQ2xpY2tkZWxldGUoZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeCueWHu+WIoOmZpFxuICAgKi9cbiAgb25DbGlja2RlbGV0ZShldmVudDogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBpbmRleDogbnVtYmVyID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgaWYgKGluZGV4ICE9IG51bGwgJiYgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGEuc3BsaWNlKGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleCwgMSk7XG4gICAgICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgICAgIG1lbW9MaXN0RGF0YTogdGhpcy5kYXRhLm1lbW9MaXN0RGF0YVxuICAgICAgICB9KVxuICAgICAgICAvL+W8guatpeabtOaWsOWIl+ihqOe8k+WtmFxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnbWVtb0xpc3REYXRhJywgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YSk7XG4gICAgICAgIGlmICh0aGlzLmRhdGEubWVtb0xpc3REYXRhLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgd3guY2xlYXJTdG9yYWdlU3luYygpO1xuICAgICAgICAgIHRoaXMuZGF0YS5pc051bGxEYXRhID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmRhdGEuY291bnQgPSAwO1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgICAgICAgaXNOdWxsRGF0YTogdGhpcy5kYXRhLmlzTnVsbERhdGEsXG4gICAgICAgICAgICBjb3VudDogdGhpcy5kYXRhLmNvdW50XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+WIoOmZpOaIkOWKnycsXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9LFxuXG4gIC8qKlxuICAgKiDliIfmjaLmqKHlvI9cbiAgICovXG4gIG9uQ2xpY2tUb2dnbGVNb2RlKCkge1xuICAgIHRoaXMuZGF0YS5pc0xpc3RNb2RlID0gIXRoaXMuZGF0YS5pc0xpc3RNb2RlO1xuICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgaXNMaXN0TW9kZTogdGhpcy5kYXRhLmlzTGlzdE1vZGVcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICog5omL5oyH6Kem5pG45Yqo5L2c5byA5aeLIOiusOW9lei1t+eCuVjlnZDmoIdcbiAgICovXG4gIHRvdWNoc3RhcnQoZXZlbnQ6IGFueSkge1xuICAgIC8v5byA5aeL6Kem5pG45pe2IOmHjee9ruaJgOacieWIoOmZpFxuICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGEuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAvL+WPquaTjeS9nOS4unRydWXnmoRcbiAgICAgIGlmIChpdGVtLmlzVG91Y2hNb3ZlKVxuICAgICAgICBpdGVtLmlzVG91Y2hNb3ZlID0gZmFsc2U7XG4gICAgfSk7XG4gICAgLy/mm7TmlrDmlbDmja5cbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIG1lbW9MaXN0RGF0YTogdGhpcy5kYXRhLm1lbW9MaXN0RGF0YSxcbiAgICAgIHN0YXJ0WDogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgIHN0YXJ0WTogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WVxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIOa7keWKqOS6i+S7tuWkhOeQhlxuICAgKi9cbiAgdG91Y2htb3ZlKGV2ZW50OiBhbnkpIHtcbiAgICBsZXQgdGhhdCA9IHRoaXMsXG4gICAgICBpbmRleCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleCwvL+W9k+WJjee0ouW8lVxuICAgICAgc3RhcnRYID0gdGhhdC5kYXRhLnN0YXJ0WCwvL+W8gOWni1jlnZDmoIdcbiAgICAgIHN0YXJ0WSA9IHRoYXQuZGF0YS5zdGFydFksLy/lvIDlp4tZ5Z2Q5qCHXG4gICAgICB0b3VjaE1vdmVYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCwvL+a7keWKqOWPmOWMluWdkOagh1xuICAgICAgdG91Y2hNb3ZlWSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFksLy/mu5Hliqjlj5jljJblnZDmoIdcbiAgICAgIC8v6I635Y+W5ruR5Yqo6KeS5bqmXG4gICAgICBhbmdsZSA9IHRoYXQuYW5nbGUoeyBYOiBzdGFydFgsIFk6IHN0YXJ0WSB9LCB7IFg6IHRvdWNoTW92ZVgsIFk6IHRvdWNoTW92ZVkgfSk7XG5cbiAgICB0aGF0LmRhdGEubWVtb0xpc3REYXRhLmZvckVhY2goKHY6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICB2LmlzVG91Y2hNb3ZlID0gZmFsc2VcbiAgICAgIC8v5ruR5Yqo6LaF6L+HMzDluqbop5IgcmV0dXJuXG4gICAgICBpZiAoTWF0aC5hYnMoYW5nbGUpID4gMzApIHJldHVybjtcbiAgICAgIGlmIChpID09IGluZGV4KSB7XG4gICAgICAgIGlmICh0b3VjaE1vdmVYID4gc3RhcnRYKSAvL+WPs+a7kVxuICAgICAgICAgIHYuaXNUb3VjaE1vdmUgPSBmYWxzZVxuICAgICAgICBlbHNlIC8v5bem5ruRXG4gICAgICAgICAgdi5pc1RvdWNoTW92ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvL+abtOaWsOaVsOaNrlxuICAgIHRoYXQuc2V0RGF0YSEoe1xuICAgICAgbWVtb0xpc3REYXRhOiB0aGF0LmRhdGEubWVtb0xpc3REYXRhXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICog6K6h566X5ruR5Yqo6KeS5bqmXG4gICAqL1xuICBhbmdsZShzdGFydDogYW55LCBlbmQ6IGFueSkge1xuICAgIGxldCBfWCA9IGVuZC5YIC0gc3RhcnQuWCwgX1kgPSBlbmQuWSAtIHN0YXJ0LllcbiAgICAvL+i/lOWbnuinkuW6piBNYXRoLmF0YW4oKei/lOWbnuaVsOWtl+eahOWPjeato+WIh+WAvFxuICAgIHJldHVybiAzNjAgKiBNYXRoLmF0YW4oX1kgLyBfWCkgLyAoMiAqIE1hdGguUEkpO1xuICB9XG5cbn0pXG4iXX0=