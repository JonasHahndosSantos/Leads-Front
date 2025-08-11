interface DataProps {
    data: any;
}
export default function FormatarData(data: any){
    const dataObj = new Date(data);
    const opcoes = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    } as const;
    return new Intl.DateTimeFormat('pt-BR', opcoes).format(dataObj);
}