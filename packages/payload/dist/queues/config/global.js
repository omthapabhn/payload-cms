export const jobStatsGlobalSlug = 'payload-jobs-stats';
/**
 * Global config for job statistics.
 */ export const getJobStatsGlobal = (config)=>{
    return {
        slug: jobStatsGlobalSlug,
        fields: [
            {
                name: 'stats',
                type: 'json'
            }
        ]
    };
};

//# sourceMappingURL=global.js.map