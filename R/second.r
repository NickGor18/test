rand = function(x,m,a,c,rang,lim){ 
y = x 
k = 0 
arr = c(x) 
while(TRUE){ 
k = k+1 
x = (a*x+c)%%m; 
arr = c(arr,x%%rang)
if((x==y)||(k>lim)){ 
break; 
} 
} 
return(arr) 
} 
n1=rand(1,7,2,4,7,3) 
n2=rand(1,125,6,17,125,126) 
n3=rand(1,(2^15)-1,1664525,1013904223,1000,30000) 
n4=rand(1,(2^31)-1,48271,0,10000,20000) 
n5=rand(1,(2^32)-1,253801,14519,10000,50000) 
hist(n1) 
hist(n2) 
hist(n3) 
hist(n4) 
hist(n5) 
mw = c(mean(n1),mean(n2),mean(n3),mean(n4),mean(n5)) 
mwe = c(max(n1)/2,max(n2)/2,max(n3)/2,max(n4)/2,max(n5)/2) 
print(mw) 
print(mwe) 
disp = c(var(n1),var(n2),var(n3),var(n4),var(n5)) 
print(disp) 
m1=runif(3,0,6) 
m2=runif(125,0,125) 
m3=runif(2^15-1,0,1000) 
m4=runif(2^18-1,0,10000) 
#m5=runif(2^32-1,0,10000) 
hist(m1) 
hist(m2) 
hist(m3) 
hist(m4) 
#hist(m5) 
plot(m1) 
plot(m2) 
plot(m3) 
plot(m4) 
#plot(m5) 
mw2=c(mean(m1),mean(m2),mean(m3),mean(m4)) 
mwe2 = c(max(m1)/2,max(m2)/2,max(m3)/2,max(m4)/2) 
print(mw2) 
print(mwe2) 
disp2=c(var(m1), var(m2), var(m3),var(m4)) 
print(disp2) 
plot(n1) 
plot(n2) 
plot(n3) 
plot(n4) 
plot(n5)
 
