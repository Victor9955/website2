<!-- Summary Section with Navigation -->
<div style="background:rgb(26, 26, 26); padding: 1.5rem; margin-bottom: 2rem; border-radius: 4px; text-align: center;">
<a href="#introduction" style="color: #007bff; text-decoration: none; margin: 0 10px;">🌟 Introduction </a>
<a href="#game" style="color: #007bff; text-decoration: none; margin: 0 10px;">👾 Gameplay </a>
<a href="#tools" style="color: #007bff; text-decoration: none; margin: 0 10px;">🛠️ Custom Tools </a>
</div>

<!-- Main Content with Anchor -->
<div id="introduction" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">🌟 Introduction</h2>
        <p>
            Twice Upon a Time is a 2D local multiplayer platformer developed as a six-month school project. Tasked with creating a vertical slice, my team and we made a narrative-driven experience centered on a brother and sister interacting with a book. The gameplay blends cooperative puzzles—such as manipulating book tabs and rotating wheels and platformer movement. While the narrative does not directly affect gameplay, the duo’s playful banter and discoveries deepen immersion, framing their journey through the book’s imaginative world.
        </p>
    </div>
    <img src="https://i.imgur.com/Zlmvzil.png" 
         alt="Featured Concept Art" 
         style="margin-left: 12px;">
</div>

<div id="game" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">👾 Gameplay</h2>
        <p>
            Twice Upon a Time is a chill and cooperative two-player narrative platformer game.
            In a broken family, a brother and sister find shelter in a book, explore with them a story shaped by their imagination and fantasies.
            In this project I developped features such as :
        </p>
        <ul style="margin-top: 0.5rem;">
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Interface-based interaction system:</strong> General interface that can be used by any GameObject for gameplay interactions. (the value range from 0 to 1 acting as a lerp kind of mechanism). I also made most of the interactions that use this interface such as pulling tabs, turning wheels and bumpers that launch the player.
                    </div>
                    <img src="https://i.imgur.com/wvr82UB.gif" style="max-width: 100%; border-radius: 12px;">
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Skin system:</strong> Singleton manager handling base/win/lose skins via ScriptableObjects, persisting across scenes with automatic player detection and skin application. 
                    </div>
                    <img src="https://i.imgur.com/9drNAOB.gif" style="max-width: 100%; border-radius: 12px;">
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Two Player Camera:</strong> Offers modes like centering between both players or locking to a fixed position/path, which can switch to free movement when triggered
                    </div>
                    <img src="https://i.imgur.com/6KhIIQm.gif" 
                         style="max-width: 100%; border-radius: 12px; display: flex; gap: 10px; margin: auto;">
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Two Player Camera:</strong> Offers modes like centering between both players or locking to a fixed position/path, which can switch to free movement when triggered
                    </div>
                    <img src="https://i.imgur.com/t2TUSfw.gif" 
                         style="max-width: 100%; border-radius: 12px; display: flex; gap: 10px; margin: auto;">
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Two Player Camera:</strong> Offers modes like centering between both players or locking to a fixed position/path, which can switch to free movement when triggered
                    </div>
                    <img src="https://i.imgur.com/0QTeKUE.gif" 
                         style="max-width: 100%; border-radius: 12px; display: flex; gap: 10px; margin: auto;">
                </div>
            </li>
        </ul>
    </div>
</div>