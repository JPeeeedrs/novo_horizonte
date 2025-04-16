// exibir se sim
function toggleCampoCondicional(selectId, campoId, inputId) {
  const select = document.getElementById(selectId);
  const campo = document.getElementById(campoId);
  const input = document.getElementById(inputId);

  if (
    select.value === "sim" ||
    select.value === "particular" ||
    select.value === "municipal"
  ) {
    campo.style.display = "block";
  } else {
    campo.style.display = "none";
    input.value = "";
  }
}

// form by steps
const steps = document.querySelectorAll(".step");
let currentStep = 0;

// Exibe a etapa de acordo com o índice
function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });
}

// Avança para a próxima etapa
function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

// Volta para a etapa anterior
function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

// Exibe a primeira etapa ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  showStep(currentStep);
});

// Máscara de telefone
function aplicarMascaraTelefone(input) {
  input.addEventListener("input", function (e) {
    let valor = e.target.value.replace(/\D/g, "");

    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length <= 10) {
      valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    e.target.value = valor;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  aplicarMascaraTelefone(document.getElementById("inputMotherFone"));
  aplicarMascaraTelefone(document.getElementById("inputMotherWorkFone"));
  aplicarMascaraTelefone(document.getElementById("inputFatherFone"));
  aplicarMascaraTelefone(document.getElementById("inputFatherWorkFone"));
  aplicarMascaraTelefone(document.getElementById("inputFone"));
  aplicarMascaraTelefone(document.getElementById("inputRespFone"));
});

// Mascara de CPF
function aplicarMascaraCPF(input) {
  input.addEventListener("input", function () {
    let valor = input.value.replace(/\D/g, "");

    // Aplica a máscara
    if (valor.length > 11) valor = valor.slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    input.value = valor;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const camposCPF = document.querySelectorAll(
    "input[type='number'][id*='CPF']"
  );
  camposCPF.forEach((input) => {
    input.type = "text";
    aplicarMascaraCPF(input);
  });
});

// Mascara RG
function aplicarMascaraRG(input) {
  input.addEventListener("input", function () {
    let valor = input.value.replace(/\D/g, ""); // Remove tudo que não for número

    // Aplica a máscara
    if (valor.length > 9) valor = valor.slice(0, 9);
    valor = valor.replace(/(\d{2})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1})$/, "$1-$2");

    input.value = valor;
  });
}

// Função para aplicar máscara de CEP
function aplicarMascaraCep(input) {
  input.addEventListener("input", function (e) {
    // Remove qualquer caractere que não seja número
    let cep = this.value.replace(/\D/g, "");

    // Limita a 8 dígitos
    cep = cep.substring(0, 8);

    // Aplica a máscara (00000-000)
    if (cep.length > 5) {
      cep = cep.replace(/(\d{5})(\d{0,3})/, "$1-$2");
    }

    // Atualiza o valor do campo
    this.value = cep;
  });

  // Impede a entrada de caracteres não numéricos
  input.addEventListener("keydown", function (e) {
    // Permite: backspace, delete, tab, escape, enter, setas
    if (
      [8, 9, 13, 27, 37, 38, 39, 40, 46].includes(e.keyCode) ||
      // Permite: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.ctrlKey && [65, 67, 86, 88].includes(e.keyCode))
    ) {
      return;
    }

    // Impede qualquer coisa que não seja número
    if (
      (e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  });
}

// Aplica a máscara quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  const inputMotherCEP = document.getElementById("inputMotherCEP");
  const inputFatherCEP = document.getElementById("inputFatherCEP");

  // Muda o tipo para text para permitir o hífen
  if (inputMotherCEP) {
    inputMotherCEP.type = "text";
    aplicarMascaraCep(inputMotherCEP);
  }

  if (inputFatherCEP) {
    inputFatherCEP.type = "text";
    aplicarMascaraCep(inputFatherCEP);
  }
});

// Validação customizada para emails
function validarEmail(input) {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  input.addEventListener("input", function () {
    if (this.value && !emailRegex.test(this.value)) {
      this.setCustomValidity("Por favor, insira um email válido");
    } else {
      this.setCustomValidity("");
    }
  });

  input.addEventListener("blur", function () {
    if (this.value && !emailRegex.test(this.value)) {
      this.reportValidity();
    }
  });
}

// Aplicar quando o DOM carregar
document.addEventListener("DOMContentLoaded", function () {
  const emailMae = document.getElementById("inputMotherEmail");
  const emailPai = document.getElementById("inputFatherEmail");

  if (emailMae) validarEmail(emailMae);
  if (emailPai) validarEmail(emailPai);
});

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os inputs de data
    const birthDateInput = document.getElementById('inputBirthDate');
    const birthMotherDateInput = document.getElementById('inputMotherBirthDate');
    const birthFatherDateInput = document.getElementById('inputFatherBirthDate');
    const vencimentoInput = document.getElementById('inputVencimento');

    // Pega a data atual
    const today = new Date();

    // Calcula a data máxima: hoje + 5 anos
    const maxDate = new Date(today.getFullYear() + 5, today.getMonth(), today.getDate());

    // Formata a data no padrão ISO: YYYY-MM-DD
    const year = maxDate.getFullYear();
    const month = String(maxDate.getMonth() + 1).padStart(2, '0');
    const day = String(maxDate.getDate()).padStart(2, '0');
    const maxDateStr = `${year}-${month}-${day}`;

    // Define o atributo max para os inputs
    birthDateInput.setAttribute('max', maxDateStr);
    birthMotherDateInput.setAttribute('max', maxDateStr);
    birthFatherDateInput.setAttribute('max', maxDateStr);
    vencimentoInput.setAttribute('max', maxDateStr);

    // Opcional: exibe no console a data máxima formatada no padrão BR (DD/MM/YYYY)
    const maxDateStrBR = `${day}/${month}/${year}`;
    console.log("Data máxima permitida (formato BR):", maxDateStrBR);
  });

document.addEventListener("DOMContentLoaded", function () {
  const camposRG = document.querySelectorAll("input[type='number'][id*='RG']");
  camposRG.forEach((input) => {
    input.type = "text"; // Permitir pontos e traço
    aplicarMascaraRG(input);
  });
});

document.getElementById("exportCsv").addEventListener("click", function () {
  let form = document.getElementById("formulario");
  let inputs = form.querySelectorAll("input, select, textarea");
  let csvContent = "data:text/csv;charset=utf-8,";
});

// Função para converter datas do formato "yyyy-mm-dd" para "dd/mm/yyyy"
function formatDateBrazilian(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-"); // Espera ["yyyy", "mm", "dd"]
  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dateStr;
}

// Função para formatar CEP para o padrão brasileiro "00000-000"
function formatCEP(cepStr) {
  if (!cepStr) return "";
  // Remove tudo que não seja dígito
  cepStr = cepStr.toString().replace(/\D/g, "");
  return cepStr.length === 8
    ? cepStr.slice(0, 5) + "-" + cepStr.slice(5)
    : cepStr;
}

document.getElementById("exportCsv").addEventListener("click", function () {
  let form = document.getElementById("formulario");
  let inputs = form.querySelectorAll("input, select, textarea");
  let csvContent = "data:text/csv;charset=utf-8,";

  inputs.forEach((input) => {
    // Procura a label associada pelo atributo for
    let label = document.querySelector(`label[for="${input.id}"]`);
    let labelText = label ? label.innerText.trim() : input.name;
    let value = input.value;

    // Se o input for do tipo "date", converte para o padrão brasileiro
    if (input.type === "date") {
      value = formatDateBrazilian(value);
    }
    // Se o label contiver "CEP", formata como CEP brasileiro
    else if (labelText.toUpperCase().includes("CEP")) {
      value = formatCEP(value);
    }

    csvContent += `"${labelText}","${value}"\n`;
  });

  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "dados_formulario.csv");
  document.body.appendChild(link);
  link.click();
});

document.getElementById("exportPdf").addEventListener("click", function () {
  let { jsPDF } = window.jspdf;
  let doc = new jsPDF();
  let y = 10;
  const margin = 10;
  let form = document.getElementById("formulario");
  let inputs = form.querySelectorAll("input, select, textarea");
  let pageHeight = doc.internal.pageSize.getHeight();

  inputs.forEach((input) => {
    let label = document.querySelector(`label[for="${input.id}"]`);
    let labelText = label ? label.innerText.trim() : input.name;
    let value = input.value;

    // Trata data
    if (input.type === "date") {
      value = formatDateBrazilian(value);
    }
    // Trata CEP, verificando se a label possui "CEP"
    else if (labelText.toUpperCase().includes("CEP")) {
      value = formatCEP(value);
    }

    // Se ultrapassar o limite da página, adiciona nova página e reinicia a posição y
    if (y > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(`${labelText}: ${value}`, margin, y);
    y += 10;
  });
  doc.save("dados_formulario.pdf");
});
