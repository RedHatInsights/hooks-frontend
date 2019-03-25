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

    let relatedResourceKinds = Object.keys(item.relationships);
    let relatedResources = {};

    relatedResourceKinds.forEach((relatedResourceKind) => {
        let relatedResourcesData = Object.values(item.relationships[relatedResourceKind].data);
        let relatedIds = relatedResourcesData.map((item) => item.id);
        if (!relatedResources[relatedResourceKind]) {
            relatedResources[relatedResourceKind] = {};
        }

        relatedIds.forEach((id) => {
            let itemData = includeItemRelationships(findItemById(id, relatedResourcesData), fullPayload);
            let additionalData = includeItemRelationships(findIncluded(fullPayload, id, relatedResourceKind), fullPayload);

            relatedResources[relatedResourceKind][id] = {
                ...itemData,
                ...additionalData
            };
        });
    });
    return Object.assign(item, relatedResources);
};

export const includeRelationships = (normalizedPayload) => {
    let resourcesKinds = Object.keys(normalizedPayload);
    let relationshipsIncluded = {};

    resourcesKinds.forEach((resourceKind) => {
        let resources = normalizedPayload[resourceKind];
        let resourceIds = Object.keys(resources);

        resourceIds.forEach((id) => {
            if (!relationshipsIncluded[resourceKind]) {
                relationshipsIncluded[resourceKind] = {};
            }

            relationshipsIncluded[resourceKind][id] = includeItemRelationships(resources[id], normalizedPayload);
        });
    });
    return relationshipsIncluded;
};

export const normalizePayload = (payload) => {
    let normalized = normalize(payload);
    return includeRelationships(normalized);
};
