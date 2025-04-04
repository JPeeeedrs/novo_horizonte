document.getElementById('exportCsv').addEventListener('click', function () {
    let formData = new FormData(document.getElementById('formulario'));
    let csvContent = "data:text/csv;charset=utf-8,";
    formData.forEach((value, key) => {
        csvContent += `${key},${value}\n`;
    });
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dados_formulario.csv");
    document.body.appendChild(link);
    link.click();
});

document.getElementById('exportPdf').addEventListener('click', function () {
    let { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    let y = 10;
    let formData = new FormData(document.getElementById('formulario'));
    formData.forEach((value, key) => {
        doc.text(`${key}: ${value}`, 10, y);
        y += 10;
    });
    doc.save("dados_formulario.pdf");
});