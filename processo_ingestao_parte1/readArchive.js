// Lê e lista todos os ficheiros num arquivo ZIP usando adm-zip

const AdmZip = require("adm-zip");

async function readZipArchive(filepath) {
  try {
    const zip = new AdmZip(filepath);
    let files_in_zip = new Array();
    let files_in_manifest = new Array();

    for (const zipEntry of zip.getEntries()){
      if (zipEntry.name == 'RRD-SIP.json'){
        files_in_manifest = JSON.parse(zipEntry.getData().toString('utf8'))
      }    
      else{
        if (!zipEntry.name.startsWith(".") && zipEntry.name != "") files_in_zip.push(zipEntry.name)
      }
    }
    files_in_manifest.forEach(elem => {
        if (!files_in_zip.includes(elem.file)){
            throw "Ficheiro " + elem.file + " referenciado no RRD-SIP.json, mas não existe no pacote enviado." 
        }
        else{
            const index = files_in_zip.indexOf(elem.file)
            files_in_zip.splice(index, 1)
        }
    })
    if (files_in_zip.length > 0) throw "Ficheiro " + JSON.stringify(files_in_zip) + " não referenciado no RRD-SIP.json, mas existe no pacote enviado."
    console.log("Todos os ficheiros referenciados no RRD-SIP.json existem no pacote enviado.")
  }      
  catch (e) {
    console.log(`Erro: ${e}`);
  }
}

readZipArchive("./test.zip");

