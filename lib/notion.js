import { Client } from '@notionhq/client';

class NotionPageContentItem {
    constructor(resultProperties) {
        this.props = resultProperties;
    }

    plainText() {
        return this.props.text?.rich_text[0]?.plain_text;
    }
}

class NotionPageContent {
    constructor(results) {
        this.props = {
            content: {},
        };

        results.forEach(({ properties }) => {
            const resultID = properties.id.title[0]?.plain_text;
            this.props.content[resultID] = new NotionPageContentItem(
                properties
            );
        });
    }

    plainTextForID(id) {
        return this.props.content[id]?.plainText();
    }
}

class Notion {
    constructor({ auth, logLevel }) {
        this.client = new Client({
            auth,
            logLevel,
        });
    }

    async pageContent(pageID) {
        const data = await this.client.databases.query({
            database_id: process.env.NOTION_DATABASE_ID,
            filter: {
                property: 'pageID',
                select: {
                    equals: pageID,
                },
            },
        });

        return new NotionPageContent(data.results);
    }
}

export default new Notion({
    auth: process.env.NOTION_SECRET,
    logLevel: process.env.NOTION_LOG_LEVEL,
});
