import _ from 'lodash';
import normalize from 'json-api-normalizer';

export const defaultIntialState = {
    loading: false,
    error: null
};

export const initialStateFor = function (reducerName, initialObject = []) {
    let initState = Object.assign({}, defaultIntialState);
    initState[reducerName] = initialObject;
    return initState;
};

export const successMessage = (base) => {
    return base + '_FULFILLED';
};

export const pendingMessage = (base) => {
    return base + '_PENDING';
};

export const failureMessage = (base) => {
    return base + '_REJECTED';
};

export const findItemById = (id, array) =>
    array.find((item) => parseInt(item.id) === parseInt(id));

export const ensureIdIsNumber = (item) =>
    _.mapValues(item, (value, key) =>
        key === 'id' ? parseInt(value) : value
    );

export const findIncluded = (payload, id, type) => {
    let singleType = type.slice(0, -1);
    let singleTypePayload = payload[singleType];
    let foundItem = singleTypePayload ? findItemById(id, Object.values(singleTypePayload)) : {};
    return foundItem ? foundItem : {};
};

export const includeItemRelationships = (item, fullPayload) => {
    if (!item || !item.relationships) {
        return item;
    }

    const relatedResourceKinds = Object.keys(item.relationships);
    let relatedResources = {};

    relatedResourceKinds.forEach((relatedResourceKind) => {
        const relatedResourcesData = Object.values(item.relationships[relatedResourceKind].data);
        const relatedIds = relatedResourcesData.map((item) => item.id);
        if (!relatedResources[relatedResourceKind]) {
            relatedResources[relatedResourceKind] = {};
        }

        relatedIds.forEach((id) => {
            let itemData = includeItemRelationships(findItemById(id, relatedResourcesData), fullPayload);
            let additionalData = includeItemRelationships(findIncluded(fullPayload, id, relatedResourceKind), fullPayload);

            relatedResources[relatedResourceKind][id] = ensureIdIsNumber({
                ...itemData,
                ...additionalData
            });
        });
    });
    return ensureIdIsNumber({ ...item, ...relatedResources });
};

export const includeRelationships = (normalizedPayload) => {
    const resourcesKinds = Object.keys(normalizedPayload);
    let relationshipsIncluded = {};

    resourcesKinds.forEach((resourceKind) => {
        const resources = normalizedPayload[resourceKind];
        const resourceIds = Object.keys(resources);

        resourceIds.forEach((id) => {
            if (!relationshipsIncluded[resourceKind]) {
                relationshipsIncluded[resourceKind] = {};
            }

            relationshipsIncluded[resourceKind][id] = includeItemRelationships(resources[id], normalizedPayload);
        });
    });
    return relationshipsIncluded;
};

export const normalizePayload = (payload, endpoint) =>
    includeRelationships(normalize(payload, { endpoint }));

function compareValues(key, order = 'asc') {
    return function(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        const first = a[key];
        const second = b[key];

        let comparison = 0;
        if (first > second) {
            comparison = 1;
        } else if (first < second) {
            comparison = -1;
        }

        return order === 'desc' ? comparison * -1 : comparison;
    };
}

export const sortData = (data, sortBy) => {
    if (data && sortBy) {
        const sort = sortBy.split(' ');
        const sortedValues = _.values(data).sort(compareValues(sort[0], sort[1]));
        data = _.assign({}, sortedValues);
    }

    return data ? data : {};
};

export const normalizeData = (data, property, endpoint, sortBy) => {
    let normalizedData = normalizePayload(data, endpoint)[property];
    normalizedData = _.mapValues(normalizedData, (item) => ({ ...item, ...item.attributes }));

    return sortData(normalizedData, sortBy);
};
