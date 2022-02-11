export enum ChannelFlags {
    StatsHidden = 1,
    CommandsDisabled = 2
}

export enum ChannelSettingsFlags {
    StatsHidden = ChannelFlags.StatsHidden,
    CommandsDisabled = ChannelFlags.CommandsDisabled
}

export enum ChannelFlagTexts {
    StatsHidden = 'Skryté statistiky',
    CommandsDisabled = 'Vypnuté příkazy'
}

export const ChannelFlagMapping = [
    { source: ChannelSettingsFlags.StatsHidden, destination: ChannelFlags.StatsHidden },
    { source: ChannelSettingsFlags.CommandsDisabled, destination: ChannelFlags.CommandsDisabled }
];
