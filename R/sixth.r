install.packages("arules") 
library(arules)
tr=read.transactions("C:\\Programing\\R\\test_tr.txt",format="basket",sep=" ")
tr
#Tsel' inspekt - obobshchit' vse sootvetstvuyushchiye varianty, grafiki i statistiku, kotoryye obychno sleduyet rassmatrivat'
inspect(tr)
image(tr)
itemFrequencyPlot(tr, support = 0.1)
rules = apriori(tr, parameter= list(sup = 0.00001, conf = 0.05,target="rules"))
inspect(rules)
