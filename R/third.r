
mtcars

N=mtcars

#number of cars with automatic transmission
q=which(N[,9]==0)
length(q)

#minimum and maximum weight 
w_min=min(N[,6])
w_min
w_max=max(N[,6])
w_max


#minimum and maximum acceleration times
t_min=min(N[,7])
t_min
t_max=max(N[,7])
t_max


#three most economical cars for fuel consumption
st=sort(N[,1])
r=c(rownames(mtcars)[which(N[,1]==st[length(st)])],rownames(mtcars)[which(N[,1]==st[length(st)]-1)],rownames(mtcars)[which(N[,1]==st[length(st)-2])])
r



#engine power and acceleration time

#average value
mean(N[,4])
mean(N[,7])

#dispersion
var(N[,4])
var(N[,7])

#standard deviation
sd(N[,4])
sd(N[,7])

#quantile
quantile(N[,4])
quantile(N[,7])

#median
median(N[,4])
median(N[,7])

#correlation coefficient
cor(N[,4],N[,7])

#general statistical report
summary(N)

#interval variation range of the number of carburetors and histogram
table(N[,11])
hist(table(N[,11]))
install.packages("reshape2")
library(reshape2)
D=tips
D
table(D[,5])
hist(table(D[,5]))

