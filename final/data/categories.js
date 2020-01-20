var category = [
    {
        name: "Flooring",
        product: [
            {
                No: "1.1",
                name: "Regular pile carpet",
                units: "m<sup>2</sup>",
                children: []
            },
            {
                No: "1.2",
                name: "Extra high pile carpet",
                units: "m<sup>2</sup>",
                children: []
            },
            {
                No: "1.3",
                name: "Sponge mats",
                units: "m<sup>2</sup>",
                children: []
            },
            {
                No: "1.4",
                name: "Carpet tape",
                units: "roll",
                children: []
            },
            {
                No: "1.5",
                name: "Carpet film",
                units: "roll",
                children: []
            },
            {
                No: "1.6",
                name: "Wooden floor",
                units: "m<sup>2</sup>",
                children: []
            },
            {
                No: "1.7",
                name: "Platform",
                units: "m<sup>2</sup>",
                children: []
            }
        ]
    },
    {
        name: "Rigging",
        product: [
            {
                No: "2.1",
                name: "Hanging sign install labor",
                units: "hour",
                children: [
                    {
                        name: "Hanging sign dismantle labor",
                        units: "hour"
                    }
                ]
            },
            {
                No: "2.2",
                name: "Wooden floor install labor",
                units: "hour",
                children: []
            },
            {
                No: "2.3",
                name: "Hanging sign electricity fee",
                units: "hour",
                children: [
                    {
                        name: "Overtime",
                        units: "hour"
                    }
                ]
            },
            {
                No: "2.4",
                name: "Fabric + aluminum sign",
                units: "m<sup>2</sup>",
                children: []
            },
            {
                No: "2.5",
                name: "Metal + wooden sign",
                units: "meter",
                children: []
            },
            {
                No: "2.6",
                name: "Wall panel sign",
                units: "piece",
                children: [
                    {
                        name: "Labor",
                        units: "hour"
                    }
                ]
            }
        ]
    }
];

module.exports = category;