import { shape, string, arrayOf } from 'prop-types';

const Tags = shape({
  primary: string,
  all: arrayOf(string),
});

Tags.toString = () => `
type TagData @infer {
  primary: String
  all: [String]
}
`;

Tags.typeName = `TagData`;

export default Tags;
