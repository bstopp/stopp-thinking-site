(function () {
    'use strict';

    $(document).ready(function () {
        setTimeout(function () {
            $('.scrollable').each(function (idx, ele) {
                var sc = new IScroll(ele, {
                    mouseWheel : true
                });
            });
        }, 200);
    });
}());