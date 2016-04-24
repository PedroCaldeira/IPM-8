#include <iostream>
#include <vector>
#include <algorithm>
#include <limits>
#include <time.h>
#include <fstream>
#include <string>
#include <set>

using namespace std;

unsigned int i, j;

class Edge;

class Vertex{
public:
	int key ,d, sum, h;
	unsigned int fil;			// w'(p)= w(p) +h(v0)−h(vk)
	vector<Edge> edges;


	Vertex(int key): key(key), d(numeric_limits<int>::max()),sum(0),h(0), fil(0){}
};

struct Edge{
	int head;
	int weight;
	int tail;
};

vector<Vertex*> graphV;

int main(){
	unsigned int places, hqs, connections;
	scanf("%d %d %d",&places,&hqs,&connections);
	graphV.resize(places+1);
	int order[hqs];
	Edge edgelist[connections];
	for(i=1;i<=places;i++)
		graphV[i]=new Vertex(i);


	int hq;

	for(i=0;i<hqs;i++){
		scanf("%d ",&hq);
		order[i]=hq;
	}
	int ver1,ver2,weight;

	for (i=0; i<connections; i++){
		scanf("%d %d %d",&ver1,&ver2,&weight);
		Edge e={ver2, weight, ver1};
		graphV[ver1]->edges.push_back(e);
		edgelist[i]=e;

	}

//Bellman Ford
	int changed=1;
	for(i=1;i<graphV.size()-1;i++){
		if(changed){
			changed=0;
			for (unsigned int k=0; k<connections;k++){
				Vertex* head=graphV[edgelist[k].head];
				Vertex* tail=graphV[edgelist[k].tail];
				int relaxedH=tail->h+edgelist[k].weight;
				if(relaxedH<head->h){
					head->h=relaxedH;
					changed=1;
				}
			}

		}
		else
			break;
	}
	
//reWeighting

	for(i=1;i<graphV.size();i++){
		vector<Edge>& edges=graphV[i]->edges;
		for(j=0;j<edges.size(); j++){
			Edge& edge= edges[j];						//
			edge.weight=(graphV[i]->h+edge.weight - graphV[edge.head]->h);
		}
	}



//Dijkstra

	set<pair<int,int> > Q;
	for(unsigned int t=0;t<hqs;t++){
			int x=order[t];

			graphV[x]->d=0;
			pair<int,int> p1(0,x);
			Q.insert(p1);
			while (Q.size()>0){
				pair<int,int> p=*Q.begin();
				Q.erase(Q.begin());
				int d=p.first;
				int vIndex=p.second;
				Vertex* v=graphV[vIndex];
				v->d=d;




				vector<Edge>& edges=v->edges;
				for (j=0; j<edges.size(); j++){


					if (graphV[edges[j].head]->d > d+edges[j].weight){
						if (graphV[edges[j].head]->d != numeric_limits<int>::max()){
							pair<int,int> p2(graphV[edges[j].head]->d, graphV[edges[j].head]->key);
							Q.erase(p2);
						}
						pair<int,int> p3(d+edges[j].weight, graphV[edges[j].head]->key);
						Q.insert(p3);
						graphV[edges[j].head]->d=(d+edges[j].weight);


					}


				}

				v->sum+=(d+v->h - graphV[x]->h);
				v->fil++;


			}
			Q.clear();
			for(i=1;i<graphV.size();i++){
				graphV[i]->d=(numeric_limits<int>::max());
			}



	}


	Vertex* minVer= NULL;																//0KB
	for (i = 1; i < places+1; i++){
		//cout<<graphV[i]->getFil()<<":"<<hqs<<endl;
		if (graphV[i]->fil<hqs){
			continue;
		}
		else {
			if (minVer==NULL)
				minVer=graphV[i];
			else{
				if (graphV[i]->sum<minVer->sum)
					minVer=graphV[i];
			}
		}

	}
	if (minVer==NULL)																					//0KB
		cout<<"N"<<endl;
	else{
		cout<<minVer->key<<" "<<minVer->sum<<endl;
		for(unsigned t=0;t<hqs;t++){
			int x=order[t];

			graphV[x]->d=0;
			pair<int,int> p1(0,x);
			Q.insert(p1);
			while (Q.size()>0){
				pair<int,int> p=*Q.begin();
				Q.erase(Q.begin());
				int d=p.first;
				int vIndex=p.second;
				Vertex* v=graphV[vIndex];
				v->d=d;




				vector<Edge>& edges=v->edges;
				for (j=0; j<edges.size(); j++){


					if (graphV[edges[j].head]->d > d+edges[j].weight){
						if (graphV[edges[j].head]->d != numeric_limits<int>::max()){
							pair<int,int> p2(graphV[edges[j].head]->d, graphV[edges[j].head]->key);
							Q.erase(p2);
						}
						pair<int,int> p3(d+edges[j].weight, graphV[edges[j].head]->key);
						Q.insert(p3);
						graphV[edges[j].head]->d=(d+edges[j].weight);


					}


				}

				if(v==minVer){
					cout<<d+v->h - graphV[x]->h<<" ";
					Q.clear();
					break;
					}

			}
			for(i=1;i<graphV.size();i++){
				graphV[i]->d=(numeric_limits<int>::max());
			}

	}
		cout<<endl;

	}

	for ( i=1; i<places+1; i++){  //no leaks									40KB
		
		delete graphV[i];
	}

/*
	for (i=0; i<graphE.size(); i++){  //no leaks
		delete graphE[i];
	}*/

}