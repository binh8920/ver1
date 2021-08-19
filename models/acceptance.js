import moment from 'moment';

class Acceptance {
    constructor(id, requests, totalRequest, date) {
        this.id = id,
            this.requests = requests,
            this.totalRequest = totalRequest,
            this.date = date;
    }

    get readableDate() {
        //   return this.date.toLocaleDateString('en-EN', {
        //       year: 'numeric',
        //       month: 'long',
        //       day: 'numeric',
        //       hour: '2-digit',
        //       minute: '2-digit'
        //   });
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }
}

export default Acceptance;