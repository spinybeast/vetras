import Appbase from "appbase-js";

const ELASTIC_URL = 'http://vetra.checkmobile.com:9200';

export function searchAll(index, field) {
    return search(index, field, {match_all: {}})
}

export function search(index, field, query) {
    const client = Appbase({
        url: ELASTIC_URL,
        app: index
    });
    return client.search({
        body: {query},
    })
        .then(res => {
            console.log(res)
            return res.hits.hits.map(hit => field ? hit._source[field] : hit._source);
        })
        .catch(err => console.log('searchAll error: ', err));
}

export function insert(index, body) {
    const client = Appbase({
        url: ELASTIC_URL,
        app: index
    });

    return client.index({type: '_doc', body})
        .then(res => res._id)
        .catch(err => {
            console.log(body, err);
        });
}