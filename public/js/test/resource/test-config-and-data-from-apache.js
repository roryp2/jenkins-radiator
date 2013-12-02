configs = [
    {
        ci_json_url:["https://builds.apache.org"],
        refresh_interval: 12000,
        radiatorTitle: 'All Apache jobs',
        excludeFilter: [],
        includeFilter: []
    },
    {
        ci_json_url:["https://builds.apache.org"],
        refresh_interval: 12000,
        radiatorTitle: 'Only Active MQ from all Apache jobs',
        excludeFilter: [],
        includeFilter: ['ActiveMQ']
    },
    {
        ci_json_url:["https://builds.apache.org"],
        refresh_interval: 12000,
        radiatorTitle: 'Every job except Active MQ from all Apache jobs',
        excludeFilter: ['ActiveMQ'],
        includeFilter: []
    },
    {
        ci_json_url:["https://builds.apache.org"],
        refresh_interval: 12000,
        radiatorTitle: 'Every job except excluded and inlcuding only included from all Apache jobs',
        excludeFilter: ['ActiveMQ','Accumulo-1.3.x','Accumulo-1.4.x','Accumulo-Trunk','ACE-trunk'],
        includeFilter: ['ActiveMQ','Abdera-trunk','Abdera2-trunk']
    }


];
config = configs[0];

json = {
    "assignedLabels": [
        {}
    ],
    "description": "<a href=\"http://www.apache.org/\"><img src=\"https://www.apache.org/images/asf_logo_wide.gif\"></img></a>\r\n<p>\r\nThis is a public build and test server for <a href=\"http://projects.apache.org/\">projects</a> of the\r\n<a href=\"http://www.apache.org/\">Apache Software Foundation</a>. All times on this server are UTC.\r\n</p>\r\n<p>\r\nSee the <a href=\"http://wiki.apache.org/general/Hudson\">Jenkins wiki page</a> for more information\r\nabout this service.\r\n</p>",
    "jobs": [
        {
            "color": "aborted",
            "name": "Abdera-trunk",
            "url": "https://builds.apache.org/job/Abdera-trunk/"
        },
        {
            "color": "red_anime",
            "name": "Abdera2-trunk",
            "url": "https://builds.apache.org/job/Abdera2-trunk/"
        },
        {
            "color": "disabled",
            "name": "Accumulo-1.3.x",
            "url": "https://builds.apache.org/job/Accumulo-1.3.x/"
        },
        {
            "color": "blue",
            "name": "Accumulo-1.4.x",
            "url": "https://builds.apache.org/job/Accumulo-1.4.x/"
        },
        {
            "color": "blue",
            "name": "Accumulo-Trunk",
            "url": "https://builds.apache.org/job/Accumulo-Trunk/"
        },
        {
            "color": "yellow",
            "name": "ACE-trunk",
            "url": "https://builds.apache.org/job/ACE-trunk/"
        },
        {
            "color": "red",
            "name": "ActiveMQ",
            "url": "https://builds.apache.org/job/ActiveMQ/"
        },
        {
            "color": "blue_anime",
            "name": "ZooKeeper_branch34_solaris",
            "url": "https://builds.apache.org/job/ZooKeeper_branch34_solaris/"
        }
    ],
    "mode": "EXCLUSIVE",
    "nodeDescription": "the master Jenkins node",
    "nodeName": "",
    "numExecutors": 0,
    "overallLoad": {},
    "primaryView": {
        "name": "All",
        "url": "https://builds.apache.org/"
    },
    "quietingDown": false,
    "slaveAgentPort": 0,
    "unlabeledLoad": {},
    "useCrumbs": true,
    "useSecurity": true,
    "views": [
        {
            "name": "All",
            "url": "https://builds.apache.org/"
        },
        {
            "name": "Hadoop",
            "url": "https://builds.apache.org/view/Hadoop/"
        }
    ]
};