function UI(creator) {
    
    
    this.width;
    this.height;
    this.html = new Html();
    
    this.init = function(width, height) {
        this.width = width;
        this.height = height;
        this.addCharGridToHolder();
        var self = this;
        $("#grid-value").blur(function() {
            self.updateGridFromInput();
            self.updateGridFromInput();
        });
        $("#add-char-to-grid").click(function() {
            self.addCharGridToHolder();
        });
    }
    
    this.updateValueInput = function() {
        var values = [];
        var chars_holders = $(".grid-holder");
        for(var i = 0; i < chars_holders.size(); i++) {
            var holder = chars_holders[i];
            var with_current_holder = function(selector) {return $(holder).find(selector);};
            for(var w = 0; w < this.width; w++) {
                var value = 0x00;
                for(var h = 0; h < this.height; h++) {
                    var activeCell = with_current_holder(".grid-cell-"+w+"-"+h).hasClass("selected-cell");
                    if(activeCell) {
                        value |= 1 << h;
                    }
                }
                values.push("0x" + value.toString(16));
            }
        } 
        $("#grid-value").val(values.join(","));
    }

    this.updateGridFromInput = function() {
        var values = $("#grid-value").val().split(",");
        var chars_holders = $(".grid-holder");
        for(var i = 0; i < (values.length / this.width) - chars_holders.size(); i++) {
            this.addCharGridToHolder();
        }
        for(var i = 0; i < chars_holders.size(); i++) {
            var holder = chars_holders[i];
            var with_current_holder = function(selector) {return $(holder).find(selector);};
            for(var w = 0; w < this.width; w++) {
                var value = parseInt(values[(i * this.width) + w]);
                for(var h = 0; h < this.height; h++) {
                    var cell = with_current_holder(".grid-cell-"+w+"-"+h);
                    if((value & 1 << h) > 0) {
                        cell.addClass("selected-cell").removeClass("unselected-cell");
                    } else {
                        cell.addClass("unselected-cell").removeClass("selected-cell");
                    }
                }
            }
        }
    }
    
    this.addCharGridToHolder = function() {
        var self = this;
        var ch = $("<td></td>").append(this.html.getCharGrid(this.width, this.height));
        $("#chars-holder-tr").append(ch)
        ch.find(".close-box").click(function() {
            ch.remove();
        });
        ch.find(".grid-cell").click(function() {
            if($(this).hasClass("selected-cell")) {
                $(this).removeClass("selected-cell").addClass("unselected-cell");
            } else {
                $(this).removeClass("unselected-cell").addClass("selected-cell");
            }
            self.updateValueInput();
        });        
    }
}

function Html() {
    this.getCharGrid = function(width, height) {
        var div = $("<div></div>");
        var close = $("<div>close&nbsp;</div>");
        var table = $("<table></table>");
        var tr, td;
        div.addClass("grid-holder");
        close.addClass("close-box");
        for (var cols = 0; cols < height; cols++) {
            tr = $("<tr></tr>");
            for (var rols = 0; rols < width; rols++) {
                td = $("<td></td>");
                td.addClass("grid-cell");
                td.addClass("grid-cell-" + rols + "-" + cols);
                tr.append(td);
            }
            table.append(tr);
        }
        div.append(close);
        div.append(table);
        return div;
    }
}
