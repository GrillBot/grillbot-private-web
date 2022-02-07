export enum ChannelFlags {
    StatsHidden = 1
}

export enum ChannelSettingsFlags {
    StatsHidden = ChannelFlags.StatsHidden
}

export enum ChannelFlagTexts {
    StatsHidden = 'Skryté statistiky'
}

export const ChannelFlagMapping = [
    { source: ChannelSettingsFlags.StatsHidden, destination: ChannelFlags.StatsHidden }
];
