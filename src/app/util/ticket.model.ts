export class Ticket {

    constructor(
        public idTicket: number,
        public assunto: string,
        public status: string,
        public dateSla: string,
        public key: string
    ) { }
}
