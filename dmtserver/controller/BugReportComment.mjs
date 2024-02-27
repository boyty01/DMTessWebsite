import {BugReportComment} from '../model/BugReportComment.mjs';

export async function makeComment(req, res) {
    var comment = await BugReportComment.makeComment(req.body.BugReportComment.author, req.body.bugReportComment.comment);

    if(comment) {
        res.status(201).send(comment.getFields());
        return;
    }

    res.status(501).send();
}