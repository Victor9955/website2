<!-- Summary Section with Navigation -->

<div style="background:rgb(26, 26, 26); padding: 1.5rem; margin-bottom: 2rem; border-radius: 4px; text-align: center;">
<a href="#introduction" style="color: #007bff; text-decoration: none; margin: 0 10px;">🌟 Introduction </a>
<a href="#game" style="color: #007bff; text-decoration: none; margin: 0 10px;">👾 Game </a>

</div>

<!-- Main Content with Anchor -->
<div id="introduction" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">🌟 Introduction</h2>
        <p>
            The Mothership Calls is a 2D local multiplayer asteroid game developed as a one-week school project. The purpose was to create a small game in groups of three using only C++ and SFML. We decided to make small game where two player save a planet from incoming asteroids when both players press on their "shoot" key at the same time they create a beam that destroy any asteroid in the way appear between them. Their are two types of steroids ones that folow the closest player and one that go toward the planet. Each players have two lives.
        </p>
    </div>
    <img src="https://i.imgur.com/2ldxkpv.png" 
         alt="Featured Concept Art" 
         style="margin-left: 12px;">
</div>

<div id="game" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">👾 Gameplay Architecture</h2>
        <p>
            In this project I made the collision systems with two types of collision : Line to sphere and sphere to sphere. and we had to write a full uml for the project
        </p>
    </div>
</div>
<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
        SphereCollider.cpp
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    SphereCollider::SphereCollider(sf::Vector2f& pos, float rad)
    {
        position = &pos;
        radius = rad;
    }

    bool SphereCollider::CheckCollision(SphereCollider collider)
    {
        return sqrtf(powf(collider.position->x - position->x, 2.0f) + powf(collider.position->y - position->y, 2.0f)) <= collider.radius + radius;
    }

    bool SphereCollider::CheckCollision(sf::Vector2f point)
    {
        return sqrtf(powf(point.x - position->x, 2.0f) + powf(point.y - position->y, 2.0f)) <= radius;
    }

    bool SphereCollider::CheckCollision(LineCollider collider)
    {
        if (CheckCollision(*collider.a) || CheckCollision(*collider.b))
        {
            return true;
        }
        else
        {
            float lineLength = sqrtf(powf(collider.a->x - collider.b->x, 2.0f) + powf(collider.a->y - collider.b->y, 2.0f));
            float dot = (((position->x - collider.a->x) * (collider.b->x - collider.a->x)) + ((position->y - collider.a->y) * (collider.b->y - collider.a->y)) ) / pow(lineLength, 2);
            sf::Vector2f closest = sf::Vector2f(collider.a->x + (dot * (collider.b->x - collider.a->x)), collider.a->y + (dot * (collider.b->y - collider.a->y)));
            
            
            if (!CheckCollision(closest))
            {
                return false;
            }
            else if(sqrtf(powf(collider.a->x - closest.x, 2.0f) + powf(collider.a->y - closest.y, 2.0f)) + sqrtf(powf(collider.b->x - closest.x, 2.0f) + powf(collider.b->y - closest.y, 2.0f)) == sqrtf(powf(collider.a->x - collider.b->x, 2.0f) + powf(collider.a->y - collider.b->y, 2.0f)))
            {
                return true;
            }
        }
    }

</div>
</details>
<div style="width: 100%; display: block; clear: both; margin: 0 auto; padding: 0 15px; color: #fff; box-sizing: border-box;">
    <p>
        We also had to write a full uml for the project :
    </p>
    <img src="https://i.imgur.com/c9oQuV6.jpeg" style="max-width: 100%; border-radius: 12px;">
</div>

<p style="color:black;">
    .
</p>

