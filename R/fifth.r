library("cluster")
#rnorm - normalnoe randomnoe raspredelenie(stand otklonenie ot kazdogo chisla kotoroe generit func), ncol - co-vo colonok
x =matrix(rnorm(100, sd = 500), ncol = 2)
colnames(x) = c("x", "y")
cl =clara(x, 3)
plot(x, col = cl$cluster)
data(votes.repub)
#Vychislyayet aglomerativnuyu iyerarkhiche	skuyu klasterizatsiyu nabora dannykh.
plot(agnes(votes.repub))