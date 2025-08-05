import pandas as pd

# Load data
data_path = "../data/BrentOilPrices.csv"
df = pd.read_csv(data_path)

# Print rows around position 8360
print("Rows around position 8360:")
print(df.iloc[8355:8365])
print("\nUnique date formats:")
print(df['Date'].head(10))  # Check first 10 dates
print(df['Date'].tail(10))  # Check last 10 dates 
