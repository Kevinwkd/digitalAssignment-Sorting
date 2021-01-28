import { payeeList, Payee } from './payeeList';
import { orderBy } from 'lodash';

const nameComparison = (objA: Payee, objB: Payee) => {
    if ( objA.name < objB.name ){
        return 1;
    }
    if ( objA.name > objB.name ){
        return -1;
    }
    return 0;
}

const primaryPayeeList = payeeList.filter(item => item.primary.isPrimary).sort(nameComparison);
const paySomeonePayeeList = payeeList.filter(item => !item.primary.isPrimary && item.payeeType === 'PAY_ANYONE').sort(nameComparison);
const linkedPayeeList = payeeList.filter(item => !item.primary.isPrimary && item.payeeType === 'LINKED').sort(nameComparison);
const bpayPayeeList = payeeList.filter(item => !item.primary.isPrimary && item.payeeType === 'BPAY').sort(nameComparison);

// Vanilla JS sorting
const vanillaSortedArray = primaryPayeeList.concat(paySomeonePayeeList, linkedPayeeList, bpayPayeeList);

// Loadsh sorting
const loadshSortedArray = orderBy(orderBy(payeeList, ['name'], ['desc']), [ obj => obj.primary.isPrimary, obj => obj.payeeType], ['desc', 'desc']);


console.log("Vanilla JS sorting", vanillaSortedArray);
console.log("Loadsh sorting", loadshSortedArray);