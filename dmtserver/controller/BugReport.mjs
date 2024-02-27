import {BugReport} from '../model/BugReport.mjs';

export async function newRecord(data) {
    return BugReport.createRecord(data.creator, data.reportBody, data.platform, data.reportTransform);
};

export async function getRecord(guid) {
    return BugReport.fetchRecord(guid);
}

export async function deleteRecord(guid) {

}