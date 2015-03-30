// Provides Use API to call functions on global objects.

'use strict';

var global = this;

use([ '/libs/wcm/foundation/components/utils/ResourceUtils.js' ], function(ResourceUtils) {

    var _getLanguage = function() {
        var language = '';
        if (global.currentPage) {
            language = global.currentPage.getLanguage(false);
        }
        return language;
    };

    var lang = _getLanguage();

    return {
        lang : lang
    };
});
