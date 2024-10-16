import { isEmpty } from "../../utis/utils";

export function downloadFile(file: Blob, fileName: string, url?: string): void {
  // Verifique se o ambiente é o navegador
  if (typeof window !== "undefined") {
    const navigator = window.navigator as any;

    // Verifique se o navegador suporta msSaveOrOpenBlob (IE11 ou Edge legado)
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(file, fileName);
    } else {
      if (isEmpty(url)) {
        url = URL.createObjectURL(file);
      }
      // Chrome, Safari, Firefox, Opera
      const a = document.createElement("a");
      // Firefox exige que o link esteja no body
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = fileName;
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Revogue o URL para liberar memória
    }
  } else {
    console.warn('downloadFile foi chamado em um ambiente onde window não está disponível.');
  }
}
