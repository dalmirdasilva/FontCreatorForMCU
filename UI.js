function UI(creator) {
    
    
    this.width;
    this.height;
    
    
    this.init = function() {
        this.createFontGrid(5, 8);
        var self = this;
        $(".grid-cell").click(function() {
            $(this).toggleClass("selected-cell", "unselected-cell");
            self.updateValueInput();
        });
        
        $("#grid-value").blur(function() {
            self.updateGridFromInput();
        });
    
    }
    
    this.createFontGrid = function(width, height) {
        var html = "<table class='grid-table'>";
        this.width = width;
        this.height = height;
        for(var h = 0; h < height; h++) {
            html += "<tr>";
            for(var w = 0; w < width; w++) {
                html += "<td class='grid-cell' id='grid-cell-"+w+"-"+h+"'></td>";
            }
            html += "</tr>";
        }
        html += "</table>";
        $("#grid-holder").html(html);
    }
    
    this.updateValueInput = function() {
        var values = [];
        for(var w = 0; w < this.width; w++) {
            var value = 0x00;
            for(var h = 0; h < this.height; h++) {
                var activeCell = $("#grid-cell-"+w+"-"+h).hasClass("selected-cell");
                if(activeCell) {
                    value |= 1 << h;
                }
            }
            values.push("0x" + value.toString(16));
        }
        $("#grid-value").val(values.join(","));
    }

    this.updateGridFromInput = function() {
        var values = $("#grid-value").val().split(",");
        for(var w = 0; w < this.width; w++) {
            var value = parseInt(values[w]);
            for(var h = 0; h < this.height; h++) {
                var cell = $("#grid-cell-"+w+"-"+h);
                if((value & 1 << h) > 0) {
                    cell.addClass("selected-cell").removeClass("unselected-cell");
                } else {
                    cell.addClass("unselected-cell").removeClass("selected-cell");
                }
            }
        }
    }
}
