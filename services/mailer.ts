var Imap = require('imap'),
    inspect = require('util').inspect;

    import { ImapFlow, MailboxObject } from 'imapflow';
    const client = new ImapFlow({
        host: 'imap.yandex.ru',
        port: 993,
        secure: true,
        auth: {
            user: 'priz.a@yandex.ru',
            pass: '89045462751'
        }
    });
export const imapFlowConnect=()=>{
    const main = async () => {
        // Wait until client connects and authorizes
        await client.connect();
        
        // Select and lock a mailbox. Throws if mailbox does not exist
        let lock = await client.getMailboxLock('INBOX');
        try {
            // fetch latest message source
            // client.mailbox includes information about currently selected mailbox
            // "exists" value is also the largest sequence number available in the mailbox
            console.log(client.mailbox );
            const obj:MailboxObject=client.mailbox as MailboxObject;
            let message = await client.fetchOne(obj.exists.toString(), { source: true,uid:true,bodyStructure:true,headers:false,bodyParts:["1"],envelope:true });
    
            // list subjects for all messages
            // uid value is always included in FETCH response, envelope strings are in unicode.
            for await (let message of client.fetch(`10879:*`, { envelope: true })) {
                console.log(`${message.uid}`);
            }
        } finally {
            // Make sure lock is released, otherwise next `getMailboxLock()` never returns
            lock.release();
        }
    
        // log out and close connection
        await client.logout();
    };
    
    main().catch(err => console.error(err));
}    
