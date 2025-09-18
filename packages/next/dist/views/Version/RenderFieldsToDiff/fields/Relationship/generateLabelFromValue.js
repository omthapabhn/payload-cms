import { fieldAffectsData, fieldIsPresentationalOnly, fieldShouldBeLocalized } from 'payload/shared';
export const generateLabelFromValue = ({
  field,
  locale,
  parentIsLocalized,
  req,
  value
}) => {
  let relatedDoc;
  let relationTo = field.relationTo;
  let valueToReturn = '';
  if (typeof value === 'object' && 'relationTo' in value) {
    relatedDoc = value.value;
    relationTo = value.relationTo;
  } else {
    // Non-polymorphic relationship
    relatedDoc = value;
  }
  const relatedCollection = req.payload.collections[relationTo].config;
  const useAsTitle = relatedCollection?.admin?.useAsTitle;
  const useAsTitleField = relatedCollection.fields.find(f => fieldAffectsData(f) && !fieldIsPresentationalOnly(f) && f.name === useAsTitle);
  let titleFieldIsLocalized = false;
  if (useAsTitleField && fieldAffectsData(useAsTitleField)) {
    titleFieldIsLocalized = fieldShouldBeLocalized({
      field: useAsTitleField,
      parentIsLocalized
    });
  }
  if (typeof relatedDoc?.[useAsTitle] !== 'undefined') {
    valueToReturn = relatedDoc[useAsTitle];
  } else {
    valueToReturn = String(relatedDoc.id);
  }
  if (typeof valueToReturn === 'object' && valueToReturn && titleFieldIsLocalized && valueToReturn?.[locale]) {
    valueToReturn = valueToReturn[locale];
  }
  if (valueToReturn && typeof valueToReturn === 'object' && valueToReturn !== null || typeof valueToReturn !== 'string') {
    valueToReturn = JSON.stringify(valueToReturn);
  }
  return valueToReturn;
};
//# sourceMappingURL=generateLabelFromValue.js.map