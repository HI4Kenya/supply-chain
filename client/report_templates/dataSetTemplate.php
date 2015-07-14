<script>
    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };

    $('#savePdf').click(function () {
        doc.fromHTML($('#content').html(), 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
        doc.save('sample-file.pdf');
    });
</script>


<div class="container-fluid" id="content">
    <div class="panel panel-success">
        <div class="panel-heading">
            <h2>Ministry Of Health</h2></br>
            <h3 id="formName"></h3></br>
            <label style="color:black">Facility Name:</label><span id="facility_detail"></span>&nbsp;&nbsp;
            <label style="color:black">Master Facility Code:</label><span id="facility_id"></span>&nbsp;&nbsp;
            <label style="color:black">Period of Reporting:</label><span id="reportingperiod"></span>
            <div class="col-md-offset-8">
                <button class="btn btn-success post-data">Post Data</button>
<!--                <div id="editor"></div>-->
<!--                <button id="savePdf" class="btn btn-default">Save as PDF</button>-->
            </div>

            <div id="loading"></div>
            <div id="post-log"></div>
        </div>
        <div class="panel-body" style="overflow: scroll" id="formData">
        </div>
    </div>

    <p>&nbsp;</p>

</div>
