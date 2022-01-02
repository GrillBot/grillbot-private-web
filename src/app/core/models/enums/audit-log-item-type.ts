/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-shadow */

export enum AuditLogItemType {
    Info = 1,
    Warning = 2,
    Error = 3,
    Command = 4,
    ChannelCreated = 5,
    ChannelDeleted = 6,
    ChannelUpdated = 7,
    EmojiDeleted = 8,
    OverwriteCreated = 9,
    OverwriteDeleted = 10,
    OverwriteUpdated = 11,
    Unban = 12,
    MemberUpdated = 13,
    MemberRoleUpdated = 14,
    GuildUpdated = 15,
    UserLeft = 16,
    UserJoined = 17,
    MessageEdited = 18,
    MessageDeleted = 19,
    InteractionCommand = 20
}

export enum AuditLogItemTypeTexts {
    Info = 'Informační zpráva',
    Warning = 'Varování',
    Error = 'Chyba',
    Command = 'Příkaz',
    ChannelCreated = 'Vytvořen kanál',
    ChannelDeleted = 'Smazán kanál',
    ChannelUpdated = 'Upraven kanál',
    EmojiDeleted = 'Smazán emote',
    OverwriteCreated = 'Vytvořena výjimka do kanálu',
    OverwriteDeleted = 'Smazána výjimka do kanálu',
    OverwriteUpdated = 'Upravena výjimka do kanálu',
    Unban = 'Odblokován uživatel',
    MemberUpdated = 'Upraven uživatel',
    MemberRoleUpdated = 'Role uživatele upraveny',
    GuildUpdated = 'Server upraven',
    UserLeft = 'Uživatel opustil server',
    UserJoined = 'Uživatel se připojil na server',
    MessageEdited = 'Zpráva upravena',
    MessageDeleted = 'Zpráva odebrána',
    InteractionCommand = 'Integrovaný příkaz'
}
