import { groupBy } from "lodash";

export const transformExpenseBreakdown = ({ transactions, categories }) => {
  const categoryLookup = categories.reduce((acc, category) => {
    acc[category._id] = category.name;
    return acc;
  }, {});

  const transactionsWithCategoryNames = transactions.map((transaction) => ({
    ...transaction,
    categoryName: categoryLookup[transaction.category] || "Unknown Category",
  }));

  const groupedByDate = groupBy(transactionsWithCategoryNames, (item) => {
    const date = new Date(item.date);
    return date.getDate();
  });

  const transformedData = Object.keys(groupedByDate).map((day) => {
    const transactions = groupedByDate[day];
    const categories = transactions.reduce((acc, curr) => {
      const category = curr.categoryName;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += curr.amount;
      return acc;
    }, {});

    return { date: parseInt(day, 10), ...categories };
  });

  return transformedData;
};
