import { Injectable } from '@angular/core';

var printCounter = 0;

@Injectable()
export class Globals {
    // SYSTEM TITLE
    SYSTEM_TITLE: string = 'Cavallini Imóveis';

    // GLOBAL VARIABLES STRINGS
    STRING_TEXT_NOT_FOUND: string = 'Nenhum resultado encontrado.';
    STRING_TEXT_DUPLICATE_ITEM: string = 'Não é possível cadastrar um item já existente.';

    // DATATABLES
    DATATABLES_OPTIONS = function (messageTop?, messageBottom?) {
        return {
            "dom": 'Bfrtip',
            "buttons": [
                {
                    extend: 'print',
                    text: 'Imprimir',
                    title: this.SYSTEM_TITLE,
                    messageTop: messageTop,
                    messageBottom: messageBottom,
                    exportOptions: {
                        columns: ':visible'
                    },
                    customize: function (win) {
                        var last = null;
                        var current = null;
                        var bod = [];
                        var css = '@page { size: landscape; }',
                            head = win.document.head || win.document.getElementsByTagName('head')[0],
                            style = win.document.createElement('style');
                        style.type = 'text/css';
                        style.media = 'print';
                        if (style.styleSheet)
                            style.styleSheet.cssText = css;
                        else
                            style.appendChild(win.document.createTextNode(css));
                        head.appendChild(style);
                    }
                },
                {
                    extend: 'pdfHtml5',
                    text: 'Gerar PDF',
                    title: this.SYSTEM_TITLE,
                    messageTop: messageTop,
                    messageBottom: messageBottom,
                    orientation: 'landscape',
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: 'excel',
                    text: 'Exportar para Excel',
                    title: this.SYSTEM_TITLE,
                    messageTop: messageTop,
                    messageBottom: messageBottom,
                    orientation: 'landscape',
                    exportOptions: {
                        columns: ':visible'
                    }
                }
            ],
            "responsive": true,
            "language": {
                "lengthMenu": "Mostrar _MENU_ resultados por página",
                "zeroRecords": "Nenhum registro encontrado",
                "info": "Mostrando a página _PAGE_ de _PAGES_",
                "infoEmpty": "Nenhum registro disponível",
                "infoFiltered": "(filtrando de um total de _MAX_ registro(s))",
                'emptyTable': 'Nenhum dado disponível na tabela',
                'infoPostFix': '',
                'infoThousands': ' ',
                'loadingRecords': 'Carregando...',
                'processing': 'Carregando...',
                'search': 'Buscar',
                'url': '',
                'paginate': {
                    'first': '&laquo;&laquo;',
                    'previous': '&laquo;',
                    'next': '&raquo;',
                    'last': '&raquo;&raquo;'
                },
                'aria': {
                    'sortAscending': ': Crescente',
                    'sortDescending': ': Decrescente'
                },
                "copySuccess": {
                    1: "Copiado uma linha para sua área de transferência",
                    _: "Copiado %d linhas para sua área de transferência"
                },
                "copyTitle": 'Copiar para sua área de transferência',
                "copyKeys": 'Pressione <i>ctrl</i> ou <i>\u2318</i> + <i>C</i> para copiar os dados da tabela<br>para sua área de transferência.<br><br>Para cancelar, clique nessa mensagem ou pressione ESC.',
            }
        }
    }
}