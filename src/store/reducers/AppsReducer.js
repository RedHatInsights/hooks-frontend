import {
    FETCH_APPS
} from 'Store/actions/index';
import {
    successMessage,
    failureMessage,
    initialStateFor
} from './reducerHelper';
import normalize from 'json-api-normalizer';

const filterIncluded = (payload, id, type) => {
    let singleType = type.slice(0, -1);
    let foundItem = payload[singleType][id];
    return foundItem ? foundItem : {};
};

const includeItemRelationships = (item, fullPayload) => {
    if (!item.relationships) {
        return item;
    }

    let relatedResourceKinds = Object.keys(item.relationships);
    let relatedResources = relatedResourceKinds.map((relatedResourceKind) => {
        console.log(item.relationships[relatedResourceKind]);
        let relatedResources = item.relationships[relatedResourceKind].data;
        let relatedIds = Object.keys(relatedResources);
        return relatedIds.map((id) => {
            return {
                ...relatedResources[id],
                ...filterIncluded(fullPayload, id, relatedResourceKind)
            };
        });
    });
    return Object.assign(item, relatedResources);
};

const includeRelationships = (normalizedPayload) => {
    let resourcesKinds = Object.keys(normalizedPayload);
    let relationshipsIncluded = resourcesKinds.map((resourceKind) => {
        let resources = normalizedPayload[resourceKind];
        let resourceIds = Object.keys(resources);

        return resourceIds.map((id) => {
            return includeItemRelationships(resources[id], normalizedPayload);
        });
    });
    return relationshipsIncluded;
};

export const normalizeAppsData = (payload) => {
    let normalized = includeRelationships(normalize(payload));
    console.log(payload, normalize(payload), normalized);
    return normalized;
};

export const appsReducer = function(state = initialStateFor('apps'), action) {
    switch (action.type) {
        case FETCH_APPS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case successMessage(FETCH_APPS):
            return {
                ...state,
                loading: false,
                error: null,
                apps: normalizeAppsData(action.payload)
            };

        case failureMessage(FETCH_APPS):
            return {
                ...state,
                loading: false,
                error: action.payload.message,
                apps: []
            };

        default:
            return state;
    }
};
