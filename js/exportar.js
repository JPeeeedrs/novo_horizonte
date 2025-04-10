document.getElementById('exportCsv').addEventListener('click', function () {
    let form = document.getElementById('formulario');
    let inputs = form.querySelectorAll('input, select, textarea');
    let csvContent = "data:text/csv;charset=utf-8,";
    
    inputs.forEach((input) => {
        // Procura a label associada pelo atributo for
        let label = document.querySelector('label[for="' + input.id + '"]');
        let labelText = label ? label.innerText.trim() : input.name;
        csvContent += `"${labelText}","${input.value}"\n`;
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
    const margin = 10;
    let form = document.getElementById('formulario');
    let inputs = form.querySelectorAll('input, select, textarea');
    let pageHeight = doc.internal.pageSize.getHeight();
    
    inputs.forEach((input) => {
        let label = document.querySelector('label[for="' + input.id + '"]');
        let labelText = label ? label.innerText.trim() : input.name;
        // Caso y ultrapasse a altura da página menos margem, adiciona nova página e reinicia a posição y
        if (y > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
        doc.text(`${labelText}: ${input.value}`, margin, y);
        y += 10;
    });
    doc.save("dados_formulario.pdf");
});
