import Appbase from "appbase-js";
import {ELASTIC_URL} from '../constants';

export function searchAll(index, field) {
    return search(index, field, {query: {match_all: {}}})
}

export function search(index, field, body) {
    const client = Appbase({
        url: ELASTIC_URL,
        app: index
    });
    return client.search({body})
        .then(res => {
            return res.hits.hits.map(hit => {
                let item = field ? hit._source[field] : hit._source;
                item._id = hit._id;
                return item;
            })
        })
        .catch(err => console.log('searchAll error: ',body, err));
}

export function insert(index, body) {
    const client = Appbase({
        url: ELASTIC_URL,
        app: index
    });

    return client.index({type: '_doc', body})
        .then(res => res._id)
        .catch(err => {
            console.log('insert error: ', body, err);
        });
}

export function update(index, id, body) {
    const client = Appbase({
        url: ELASTIC_URL,
        app: index
    });

    return client.index({type: '_update/'+ id, body: {doc: body}})
        .then(res => res._id)
        .catch(err => {
            console.log('update error: ', err);
        });
}
