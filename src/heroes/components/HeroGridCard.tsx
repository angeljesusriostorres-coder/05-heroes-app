import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, Eye, Zap, Brain, Gauge, Shield } from "lucide-react"
import type { Hero } from "../types/hero-interface"
import { useNavigate } from "react-router"
import { use } from "react"
import { FavoriteHeroContext } from "@/components/context/FavoriteHeroContext"

export const HeroGridCard = ({ hero }: { hero: Hero }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/heroes/${hero.slug}`);
    }
    const { isFavorite, toggleFavorite } = use(FavoriteHeroContext);

    return (
        <>
            < Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-linear-to-br from-white to-gray-50" >
                <div className="relative h-64">
                    <img
                        src={hero.image}
                        alt={hero.slug}
                        className="object-cover transition-all duration-500 group-hover:scale-110 absolute top-2.5 w-full h-102.5"
                        onClick={handleClick}
                    />

                    {/* Status indicator */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${hero.status === "Active" ? 'bg-green-500' : 'bg-red-500'}`} />
                        <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
                            {hero.status}
                        </Badge>

                    </div>

                    {/* Universe badge */}
                    <Badge className={`absolute top-3 right-3 text-xs ${hero.universe === 'DC' ? 'bg-blue-600' : 'bg-red-600'} text-white`}>{hero.universe}</Badge>

                    {/* Favorite button */}
                    <Button size="sm" variant="ghost" className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
                        onClick={() => {
                            toggleFavorite(hero);
                        }}>
                        <Heart className={`h-4 w-4 ${isFavorite(hero) ? 'fill-red-500 text-red-500' : 'text-gray-600-500'}`} />
                    </Button>

                    {/* View details button */}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Eye className="h-4 w-4 text-gray-600" />
                    </Button>
                </div>

                <CardHeader className="py-2 z-10 bg-gray-100/50 backdrop-blur-sm relative top-15 group-hover:top-1.5 transition-all duration-300">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <h3 className="font-bold text-lg leading-tight">{hero.alias}</h3>
                            <p className="text-sm text-gray-600">{hero.name}</p>
                        </div>
                        <Badge className="text-xs bg-green-100 text-green-800 border-green-200">{hero.category}</Badge>
                    </div>
                    <Badge variant="outline" className="w-fit text-xs">
                        {hero.team}
                    </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {hero.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">

                        <div className="space-y-1">
                            <div className="flex items-center gap-1">
                                <Zap className="h-3 w-3 text-orange-500" />
                                <span className="text-xs font-medium">Strength</span>
                            </div>
                            <Progress value={hero.strength * 10} className="w-full max-w-sm " BgBarColor="bg-yellow-500" PrBarColor="bg-amber-600" />
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-1">
                                <Brain className="h-3 w-3 text-blue-500" />
                                <span className="text-xs font-medium">Intelligence</span>
                            </div>
                            <Progress value={hero.intelligence * 10} className="h-2" />

                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-1">
                                <Gauge className="h-3 w-3 text-green-500" />
                                <span className="text-xs font-medium">Speed</span>
                            </div>
                            <Progress value={hero.speed * 10} className="h-2" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-1">
                                <Shield className="h-3 w-3 text-purple-500" />
                                <span className="text-xs font-medium">Durability</span>
                            </div>
                            <Progress value={hero.durability * 10} className="h-2" />
                        </div>
                    </div>

                    {/* Powers */}

                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">Powers:</h4>


                        <div className="flex flex-wrap gap-1">
                            {hero.powers.slice(0, 3).map((power, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                    {power}
                                </Badge>
                            ))}
                            {hero.powers.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{hero.powers.length} more
                                </Badge>)
                            }



                        </div>
                    </div>

                    <div className="text-xs text-gray-500 pt-2 border-t">{hero.firstAppearance}</div>
                </CardContent>
            </Card >
        </>
    )
}
