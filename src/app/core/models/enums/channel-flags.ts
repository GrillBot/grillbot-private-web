export enum ChannelFlags {
    StatsHidden = 1,
    CommandsDisabled = 2,
    Deleted = 4,
    AutoReplyDeactivated = 8
}

export enum ChannelSettingsFlags {
    StatsHidden = ChannelFlags.StatsHidden,
    CommandsDisabled = ChannelFlags.CommandsDisabled,
    AutoReplyDeactivated = ChannelFlags.AutoReplyDeactivated
}

export enum ChannelFlagTexts {
    StatsHidden = 'Skryté statistiky',
    CommandsDisabled = 'Vypnuté příkazy',
    AutoReplyDeactivated = 'Automatické odpovědi vypnuty'
}

export const ChannelFlagMapping = [
    { source: ChannelSettingsFlags.StatsHidden, destination: ChannelFlags.StatsHidden },
    { source: ChannelSettingsFlags.CommandsDisabled, destination: ChannelFlags.CommandsDisabled },
    { source: ChannelSettingsFlags.AutoReplyDeactivated, destination: ChannelFlags.AutoReplyDeactivated }
];
