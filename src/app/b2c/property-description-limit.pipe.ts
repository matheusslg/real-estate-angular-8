import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "propertyDescriptionLimit",
})
export class PropertyDescriptionLimitPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");

    function extractTextFromNode(node) {
      let text = "";
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (const childNode of node.childNodes) {
          text += extractTextFromNode(childNode) + " ";
        }
      }
      return text;
    }

    const plainText = extractTextFromNode(doc.body);

    return plainText.length > 240
      ? plainText.substring(0, 240) + "... Ler mais"
      : plainText;
  }
}
