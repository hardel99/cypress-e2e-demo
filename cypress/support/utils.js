class Utils {
    useDataQaProperty(value) {
        return `[data-qa="${value}"]`;
    }

    getRandomString(length = 8) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
    verifyResponseStatusCode() {
        expect(response.status).to.eq(statusCode);
    }

    parseStringToDate(dateString, dateFormat = 'yyyy/mm/dd') {
        const splittedValues = dateString.split(/[-|\/]/g);
        
        let dayIndex, monthIndex, yearIndex;

        switch(dateFormat.toLowerCase()) {
            case 'yyyy/mm/dd':
                dayIndex = 2; monthIndex = 1; yearIndex = 0;
                break;
            case 'dd/mm/yyyy':
                dayIndex = 0; monthIndex = 1; yearIndex = 2;
                break;
            case 'mm/dd/yyyy':
                dayIndex = 1; monthIndex = 0; yearIndex = 2;
                break;
            default:
                throw new Error('Please provide a valid date format');
        }

        const date = {
            day: splittedValues[dayIndex],
            month: Number(splittedValues[monthIndex]),
            year: splittedValues[yearIndex]
        };

        return date;
    }
}

export default new Utils;