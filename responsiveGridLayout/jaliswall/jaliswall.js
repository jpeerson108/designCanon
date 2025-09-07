/*
JALISWALL 0.1
by Pierre Bonnin - @PierreBonninPRO - 2015
*/
(function($){
  $.fn.jaliswall = function(options){

    this.each(function(){

      var defaults = {
        item : '.wall-item',
        columnClass : '.wall-column',
        resize:false
      }

      var prm = $.extend(defaults, options);

      var container = $(this);
      var items = container.find(prm.item);
      var elemsDatas = [];
      var columns = [];
      var nbCols = getNbCols();

      init();

      function init(){
        nbCols = getNbCols();
        recordAndRemove();
        print();
        if(prm.resize){
          $(window).resize(function(){
            if(nbCols != getNbCols()){
              nbCols = getNbCols();
              setColPos();
              print();
            }
          });
        }
      }

      function getNbCols(){
        var instanceForCompute = false;
        if(container.find(prm.columnClass).length == 0){
          instanceForCompute = true;
          container.append("<div class='"+parseSelector(prm.columnClass)+"'></div>");
        }
        var colWidth = container.find(prm.columnClass).outerWidth(true);
        var wallWidth = container.innerWidth();
        if(instanceForCompute)container.find(prm.columnClass).remove();
        return Math.round(wallWidth / colWidth);
      }

      // save items content and params and removes originals items
      function recordAndRemove(){
        items.each(function(index){
          var item = $(this);
          elemsDatas.push({
            content : item.html(),
            class : item.attr('class'),
            href : item.attr('href'),
            id : item.attr('id'),
            colid : index%nbCols
          });
          item.remove();
        });
      }

      //determines in which column an item should be
      function setColPos(){
        for (var i in elemsDatas){
          elemsDatas[i].colid = i%nbCols;
        }
      }

      // to get a class name without the selector
      function parseSelector(selector){
        return selector.slice(1, selector.length);
      }

      //write and append html
      function print(){
        var tree = '';
        //creates columns
        for (var i=0; i<nbCols; i++){
          tree += "<div class='"+parseSelector(prm.columnClass)+"'></div>";
        }
        container.html(tree);

        // creates items
        for (var i in elemsDatas){
          var html='';

          var content = (elemsDatas[i].content != undefined)?elemsDatas[i].content:'';
          var href = (elemsDatas[i].href != href)?elemsDatas[i].href:'';
          var classe = (elemsDatas[i].class != undefined)?elemsDatas[i].class:'';
          var id = (elemsDatas[i].id != undefined)?elemsDatas[i].id:'';

          if(elemsDatas[i].href != undefined){
            html += "<a "+getAttr(href,'href')+" "+getAttr(classe,'class')+" "+getAttr(id,'id')+">"+content+"</a>";
          }else{
            html += "<div "+getAttr(classe,'class')+" "+getAttr(id,'id')+">"+content+"</a>";
          }
          container.children(prm.columnClass).eq(i%nbCols).append(html);
        }

      }

      //creates a well-formed attribute
      function getAttr(attr, type){
        return (attr != undefined)?type+"='"+attr+"'":'';
      }

    });

    return this;
  }
})(jQuery);
