$('#anchor_quest h3').append('<button id="xiv-questinfo-export" style="margin-left: 1em;" type="button">export to csv</button>');
$("#xiv-questinfo-export").on("click", function() {
    const result = [];
    const baseUrl = window.location.href.split("?")[0];
    const pageTotal = parseInt($(".btn__pager__next--all").first().attr("href").split("page=")[1]);

    for (let page = 1; page <= pageTotal; page++) {
        let url = baseUrl + "?page=" + page;
        console.log("accessing " + url + " ..."); //I let this because it's just a POC but we would need something sexier like a progress bar for the user since it take some times...
        $.ajax(url, {async:false}).done(function(data) {
            $(".entry__quest div[href]", data).each(function() {
                result.push($(this).attr("href"));
            });
        });
    }
    let csvContent = "data:text/csv;charset=utf-8," + result.join("\r\n");
    let encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "xiv_quests_cleared.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
});
