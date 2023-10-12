import openpyxl
wb = openpyxl.Workbook()
letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
sheet = wb.active

sheet['A1'] = 'test'

wb.save("test.xls")


db = ((0,1), (1,2))
for i in db:
	print(i[0])