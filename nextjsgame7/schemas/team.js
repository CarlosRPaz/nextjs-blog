export default {
  name: "team",
  title: "Team",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string"
    },
    {
      name: "members",
      title: "Members",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {type: "author"}
          ]
        },
      ],
    },
    {
      name: "logo",
      title: "Logo image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "teamImage",
      title: "Team image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
        }
      ]
    },
    {
      name: "motto",
      title: "Motto",
      type: "string"
    },
  ],
};
