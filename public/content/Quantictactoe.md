<!-- Summary Section with Navigation -->
<div style="background:rgb(26, 26, 26); padding: 1.5rem; margin-bottom: 2rem; border-radius: 4px; text-align: center;">
<a href="#introduction" style="color: #007bff; text-decoration: none; margin: 0 10px;">🌟 Introduction</a>
<a href="#steam" style="color: #007bff; text-decoration: none; margin: 0 10px;">👨‍💻 Steamworks Integration</a>
<a href="#game" style="color: #007bff; text-decoration: none; margin: 0 10px;">👾 Game Mechanics</a>
</div>

<!-- Main Content with Anchor -->
<div id="introduction" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">🌟 Introduction</h2>
        <p>
            Quantictactoe is a personal project I developed after completing an intensive one-month class on multiplayer game development (learn more about this class in the Space Multiplayer project). Inspired by the classic game of Tic-Tac-Toe, I aimed to create a more complex and strategic multiplayer experience by introducing a layered 3x3 grid system and integrating it with Steamworks for online play.
        </p>
        <p>
            Using Unity Engine and C#, I implemented advanced features such as Steam lobby creation, socket-based server-client communication, and data serialization. Notably, I created my own custom netcode using Steam Datagram Relay (SDR) instead of relying on pre-built solutions like Netcode for GameObjects, which allowed me to gain a deeper understanding of low-level networking.
        </p>
        <p>
            This project not only solidified my understanding of multiplayer systems but also allowed me to explore a different API such as Steamworks (on previous projects I used Enet or winsock).
        </p>
    </div>
    <img src="https://media.discordapp.net/attachments/1347326761993769041/1347326784995332117/Design_sans_titre.jpg?ex=67cb6b59&is=67ca19d9&hm=4b9b0b6e22d35f62f34fd3b6bcd7c682e16f3db96664b8bdad40d8f5984bd3bf&=&format=webp&width=926&height=521" 
         alt="Featured Concept Art" 
         style="margin-left: 12px;">
</div>


<!-- Main Content with Anchor -->
<div id="steam" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">👨‍💻 Steamworks Integration</h2>
        <ul style="font-size: 120%;">
            <li>
                <span style="font-weight: bold;">Steam Lobbies</span>
                <p>
                    I used Facepunch API to make lobbies when needed, such as when a friend sends an invite or when you want to join a public lobby.
                </p>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
            Code Snippet
        </summary>
        <div style="background-color: #1a1a1a; padding: 15px; border-radius: 0 0 4px 4px;">
            <pre style="margin: 0; color:rgb(238, 238, 238);">
  public async void CreateLobby()
  {
      try
      {
          var createLobbyOutput = await SteamLobby.CreateLobbyAsync();
          if (createLobbyOutput.Success)
          {
              Debug.Log($"Lobby created: {createLobbyOutput.LobbyId}");
              // Initialize lobby settings and player data
              SteamLobby.SetLobbyData("game_mode", "survival");
              SteamLobby.SetLobbyMemberData("player_ready", "false");
          }
          else
          {
              Debug.LogError("Failed to create lobby");
          }
      }
      catch (Exception e)
      {
          Debug.LogError($"Lobby creation error: {e.Message}");
      }
  }
                        </code>
                    </pre>
                </details>
            </li>
            <li>
    <span style="font-weight: bold;">Steam Socket Server</span>
    <p>
        This class handles the server-side logic for managing connections, player data, and game state using Steamworks networking. It implements the `ISocketManager` interface to handle events like connecting, disconnecting, and receiving messages.
    </p>
    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
            Code Snippet
        </summary>
        <div style="background-color: #1a1a1a; padding: 15px; border-radius: 0 0 4px 4px;">
            <pre style="margin: 0; color:rgb(238, 238, 238);">
<code class="language-csharp">
public class SteamSocketServer : ScriptableObject, ISocketManager
{
    [SerializeField] float waitBeforeStart = 3f;
    static int globalPlayerCount = 0;
    Awaitable waitBegin = null;

    static Dictionary&lt;Connection, PlayerData&gt; players = new();

    public void ResetPlayers()
    {
        players.Clear();
    }

    public void OnConnecting(Connection connection, ConnectionInfo info)
    {
        connection.Accept();
        "Client Try To Connect".Log();
    }

    public void OnConnected(Connection connection, ConnectionInfo info)
    {
        "Client is Connected".Log();

        PlayerData playerData = new PlayerData();
        playerData.connection = connection;
        playerData.steamId = info.Identity.SteamId;
        playerData.playerNum = globalPlayerCount;
        players.Add(connection, playerData);
        globalPlayerCount++;

        if (players.Count != SteamManager.instance.maxPlayer) return;

        globalPlayerCount = 0;
        bigGrid = new();
        bigGrid.Clear();
        for (int i = 0; i < 9; i++)
        {
            bigGrid.Add(new SmallGrid());
        }
        waitForAllType = true;

        foreach (var player in players.Keys)
        {
            PacketBuilder.SendPacket(new LoadScene(2), player, SendType.Reliable);
        }
    }

    public void OnDisconnected(Connection connection, ConnectionInfo info)
    {
        connection.Close();
        "Client Disconnected".Log();
    }

    public void OnMessage(Connection connection, NetIdentity identity, IntPtr data, int size, long messageNum, long recvTime, int channel)
    {
        "Server Receive Packet".Log();
        byte[] byteArray = new byte[size];
        Marshal.Copy(data, byteArray, 0, size);
        int offset = 0;
        Opcode opcode = (Opcode)Serialization.DeserializeU16(byteArray, ref offset);
        switch (opcode)
        {
            case Opcode.Message:
                {
                    MessagePacket packet = MessagePacket.Deserialize<MessagePacket>(byteArray, ref offset);
                    packet.messsage.Log();
                    break;
                }
            case Opcode.Ready:
                {
                    if (players.TryGetValue(connection, out PlayerData player))
                    {
                        player.isReady = true;
                        foreach (var playerConnection in players.Keys)
                        {
                            PacketBuilder.SendPacket(new Ready(player.playerNum), playerConnection, SendType.Reliable);
                        }
                    }
                    CheckToStart();
                    break;
                }
            case Opcode.CancelReady:
                {
                    if (players.TryGetValue(connection, out PlayerData player))
                    {
                        player.isReady = false;
                        foreach (var playerConnection in players.Keys)
                        {
                            PacketBuilder.SendPacket(new CancelReady(player.playerNum), playerConnection, SendType.Reliable);
                        }
                        CheckToStart();
                    }
                    break;
                }
            case Opcode.Play:
                {
                    if (players.TryGetValue(connection, out PlayerData player))
                    {
                        PlayClient playTurnPacket = PlayClient.Deserialize&lt;PlayClient&gt;(byteArray, ref offset);
                        HandleTurnPakcet(player, playTurnPacket.pos, playTurnPacket.bigPos);
                    }
                    break;
                }
        }
    }
}
</code>
            </pre>
        </div>
    </details>
</li>
            <li>Data serialization</li>
        </ul>
    </div>
</div>


<!-- Video Gallery with Anchor -->
<div id="steam">
<h2>🎥 Featured Demonstrations</h2>

<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin: 2rem 0;">
  <div style="flex: 1 1 48%; min-width: 300px; border-radius: 8px; overflow: hidden; background: rgb(26, 26, 26);">
    <video controls style="width: 100%; height: auto;">
      <source src="demo-1.mp4" type="video/mp4">
    </video>
    <div style="padding: 1rem; color: #fff;">
      <strong>Concept Overview</strong><br>
      Basic principles of layout design
    </div>
  </div>

  <div style="flex: 1 1 48%; min-width: 300px; border-radius: 8px; overflow: hidden; background: rgb(26, 26, 26);">
    <video controls style="width: 100%; height: auto;">
      <source src="demo-2.mp4" type="video/mp4">
    </video>
    <div style="padding: 1rem; color: #fff;">
      <strong>Advanced Techniques</strong><br>
      Interactive elements and animations
    </div>
  </div>
</div>
</div>

<!-- Data Section with Anchor -->
<div id="game">
<h2>📊 Key Statistics</h2>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;">
  <div style="background: rgb(26, 26, 26); padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); color: #fff;">
    <h3>User Engagement</h3>
    <p>📈 62% increase with visual layouts</p>
  </div>
  <div style="background: rgb(26, 26, 26); padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); color: #fff;">
    <h3>Content Retention</h3>
    <p>💡 45% better recall with mixed media</p>
  </div>
</div>
</div>

<!-- Footer -->
<div style="border-top: 1px solid rgb(26, 26, 26); margin-top: 3rem; padding-top: 1rem; color: #fff;">
⚠️ Note: Click any section title in the summary to jump directly to that content. Replace demo videos with actual MP4 files.
</div>