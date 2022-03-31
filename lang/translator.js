'use strict';

/**
 * Translator for documentation pages.
 *
 * To enable translation you should include one of language-files in your index.html
 * after <script src='lang/translator.js' type='text/javascript'></script>.
 * For example - <script src='lang/ru.js' type='text/javascript'></script>
 *
 * If you wish to translate some new texts you should do two things:
 * 1. Add a new phrase pair ("New Phrase": "New Translation") into your language file (for example lang/ru.js). It will be great if you add it in other language files too.
 * 2. Mark that text it templates this way <anyHtmlTag data-sw-translate>New Phrase</anyHtmlTag> or <anyHtmlTag data-sw-translate value='New Phrase'/>.
 * The main thing here is attribute data-sw-translate. Only inner html, title-attribute and value-attribute are going to translate.
 *
 */
window.SwaggerTranslator = {

    _words:[],

    translate: function(sel) {
      var $this = this;
      sel = sel || '[data-sw-translate]';

      $(sel).each(function() {
        $(this).html($this._tryTranslate($(this).html()));

        $(this).val($this._tryTranslate($(this).val()));
        $(this).attr('title', $this._tryTranslate($(this).attr('title')));
      });

      
		  $(".authorize__btn").click( function() {
        setTimeout(function(){
          $('div.api-popup-title').text(frDict.AvailableAuthorizations);
          $('.api-popup-content .auth__title').text(frDict.ApiKeyAuthorization);
          $('.api-popup-content span:contains("name:")').text(frDict.name);
          $('.api-popup-content span:contains("in:")').text(frDict.in);
          $('.api-popup-content .auth__button').text(frDict.Authorize);
          $('.api-popup-content span:contains("value:")').text(frDict.value);
          $('.api-popup-cancel').text(frDict.Cancel);
          $('.api-popup-content span:contains("header")').text(frDict.header);
          $('.api-popup-content span:contains("Authorization")').text(frDict.Authorization);

        }, 200); 
        
      });
    },

    _tryTranslate: function(word) {
      return this._words[$.trim(word)] !== undefined ? this._words[$.trim(word)] : word;
    },

    learn: function(wordsMap) {
      this._words = wordsMap;
    }

    
};