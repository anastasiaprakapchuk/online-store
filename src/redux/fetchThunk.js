import isoFetch from 'isomorphic-fetch';

import { listProdLoadingAC, listProdErrorAC, listProdSetAC } from "./listProdAC";
import { infoImagesLoadingAC, infoImagesErrorAC, infoImagesSetAC } from "./infoImagesAC";
import { contactsInfoLoadingAC, contactsInfoErrorAC, contactsInfoSetAC } from "./contactsInfoAC";
import { ordersLoadingAC, ordersErrorAC, ordersSetAC } from "./ordersAC";

function listProdThunkAC(dispatch) {
    // Как и любой action creator, listProdThunkAC должен вернуть action,
    // только action будет не хэш, а ФУНКЦИЯ.
    // Все middleware стоят ДО редьюсеров, их задача - преобразовывать или фильтровать action-ы.
    // Конкретно middleware "thunk", если обнаруживает что action - функция а не хэш, 
    // ВЫПОЛНЯЕТ эту функцию и не пропускает её дальше, к редьюсерам.
    return function() {
        var ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
        var sp=new URLSearchParams();
        sp.append('f','READ');
        sp.append('n','PROKOPCHUK_CURSPROJECT_SHOPFLOWERS');

        dispatch( listProdLoadingAC() );
        dispatch( infoImagesLoadingAC() );
        dispatch( contactsInfoLoadingAC() );
        dispatch( ordersLoadingAC() );
        isoFetch(ajaxHandlerScript, {method:'post', body:sp})
            .then( (response) => { // response - HTTP-ответ
                //console.log(response);
                if (!response.ok) {
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err;
                }
                else
                    return response.json();
            })
            .then( (data) => {
                let parseData=JSON.parse(data.result);
                dispatch( listProdSetAC(parseData) );
                dispatch( infoImagesSetAC(parseData) );
                dispatch( contactsInfoSetAC(parseData) );
                dispatch( ordersSetAC(parseData) );
            })
            .catch( (error) => {
                console.error(error);
                dispatch( listProdErrorAC() );
                dispatch( infoImagesErrorAC() );
                dispatch( contactsInfoErrorAC() );
                dispatch( ordersErrorAC() );
            })
        ;
    }

}

export {listProdThunkAC};
